
import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Draw from "@/models/Draw";
import Score from "@/models/Score";
import Winner from "@/models/Winner";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import { sendWinnerEmail } from "@/lib/sendWinnerEmail";
import { adminAuth } from "@/middleware/adminMiddleware";

export async function POST(request) {
  try {
    await adminAuth();

    await connectDB();

    let drawId;

    try {
      const body = await request.json();

      console.log("Request Body:", body);

      drawId = body.drawId;
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide drawId in request body",
        },
        {
          status: 400,
        }
      );
    }

    if (!drawId) {
      return NextResponse.json(
        {
          success: false,
          message: "drawId is required",
        },
        {
          status: 400,
        }
      );
    }

    const draw = await Draw.findById(drawId);

    if (!draw) {
      return NextResponse.json(
        {
          success: false,
          message: "Draw not found",
        },
        {
          status: 404,
        }
      );
    }

    if (draw.status === "PUBLISHED") {
      return NextResponse.json(
        {
          success: false,
          message: "Draw already published",
        },
        {
          status: 400,
        }
      );
    }

    // Active subscriptions
    const subscriptions =
      await Subscription.find({
        status: "ACTIVE",
      });

    let totalPrizePool =
      subscriptions.reduce(
        (sum, sub) =>
          sum +
          (sub.prizePoolContribution || 0),
        0
      );

    // Add rollover from previous draw
    const previousDraw =
      await Draw.findOne({
        status: "PUBLISHED",
        rolloverAmount: {
          $gt: 0,
        },
      }).sort({
        createdAt: -1,
      });

    if (previousDraw) {
      totalPrizePool +=
        previousDraw.rolloverAmount;
    }

    const users =
      await User.find({
        isSubscribed: true,
      });

    const match3 = [];
    const match4 = [];
    const match5 = [];

    for (const user of users) {
      const scores =
        await Score.find({
          userId: user._id,
        });

      const userNumbers =
        scores.map(
          (item) => item.score
        );

      let matchCount = 0;

      draw.winningNumbers.forEach(
        (number) => {
          if (
            userNumbers.includes(number)
          ) {
            matchCount++;
          }
        }
      );

      if (matchCount === 3) {
        match3.push(user);
      }

      if (matchCount === 4) {
        match4.push(user);
      }

      if (matchCount === 5) {
        match5.push(user);
      }
    }

    // Prize Pools
    const fiveMatchPool =
      totalPrizePool * 0.4;

    const fourMatchPool =
      totalPrizePool * 0.35;

    const threeMatchPool =
      totalPrizePool * 0.25;

    const fivePrize =
      match5.length > 0
        ? fiveMatchPool /
          match5.length
        : 0;

    const fourPrize =
      match4.length > 0
        ? fourMatchPool /
          match4.length
        : 0;

    const threePrize =
      match3.length > 0
        ? threeMatchPool /
          match3.length
        : 0;


// Save 5 Match Winners + Email

for (const user of match5) {
  const winner = await Winner.create({
    userId: user._id,
    drawId: draw._id,
    matchCount: 5,
    amount: fivePrize,
    status: "PENDING",
  });

  try {
    await sendWinnerEmail({
      email: user.email,
      amount: fivePrize,
      matchCount: 5,
    });

    console.log(
      `Winner Email Sent To ${user.email}`
    );
  } catch (error) {
    console.error(
      "Winner Email Failed:",
      error.message
    );
  }
}

// Save 4 Match Winners + Email

for (const user of match4) {
  const winner = await Winner.create({
    userId: user._id,
    drawId: draw._id,
    matchCount: 4,
    amount: fourPrize,
    status: "PENDING",
  });

  try {
    await sendWinnerEmail({
      email: user.email,
      amount: fourPrize,
      matchCount: 4,
    });

    console.log(
      `Winner Email Sent To ${user.email}`
    );
  } catch (error) {
    console.error(
      "Winner Email Failed:",
      error.message
    );
  }
}

// Save 3 Match Winners + Email

for (const user of match3) {
  const winner = await Winner.create({
    userId: user._id,
    drawId: draw._id,
    matchCount: 3,
    amount: threePrize,
    status: "PENDING",
  });

  try {
    await sendWinnerEmail({
      email: user.email,
      amount: threePrize,
      matchCount: 3,
    });

    console.log(
      `Winner Email Sent To ${user.email}`
    );
  } catch (error) {
    console.error(
      "Winner Email Failed:",
      error.message
    );
  }
}


    // Jackpot rollover
    let rolloverAmount = 0;

    if (match5.length === 0) {
      rolloverAmount =
        fiveMatchPool;
    }

    draw.prizePool =
      totalPrizePool;

    draw.rolloverAmount =
      rolloverAmount;

    draw.status =
      "PUBLISHED";

    await draw.save();

    return NextResponse.json({
      success: true,

      drawId: draw._id,

      totalPrizePool,

      rolloverAmount,

      winners: {
        fiveMatch: {
          count: match5.length,
          prizePerWinner:
            fivePrize,
        },

        fourMatch: {
          count: match4.length,
          prizePerWinner:
            fourPrize,
        },

        threeMatch: {
          count: match3.length,
          prizePerWinner:
            threePrize,
        },
      },
    });
  } catch (error) {
    console.error(
      "Publish Draw Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

