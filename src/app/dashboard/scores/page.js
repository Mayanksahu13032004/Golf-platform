"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import ScoreStats from "@/components/score/ScoreStats";
import ScoreForm from "@/components/score/ScoreForm";
import ScoreSearch from "@/components/score/ScoreSearch";
import ScoreList from "@/components/score/ScoreList";

import EditScoreModal from "@/components/modals/EditScoreModal";
import DeleteScoreModal from "@/components/modals/DeleteScoreModal";

export default function ScoresPage() {
  const [scores, setScores] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [editingScore, setEditingScore] =
    useState(null);

  const [deleteScoreId, setDeleteScoreId] =
    useState(null);

  useEffect(() => {
    getScores();
  }, []);

  async function getScores() {
    try {
      setLoading(true);

      const res =
        await api.get("/score");

      setScores(res.data.scores);
    } catch (err) {
      toast.error("Unable to fetch scores");
    } finally {
      setLoading(false);
    }
  }

  async function addScore(data) {
    try {
      await api.post(
        "/score",
        data
      );

      toast.success(
        "Score Added Successfully"
      );

      getScores();
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Failed"
      );
    }
  }

  async function deleteScore(id) {
    try {
      await api.delete(
        `/score/${id}`
      );

      toast.success(
        "Score Deleted"
      );

      getScores();
    } catch {
      toast.error(
        "Delete Failed"
      );
    }
  }

  const filtered =
    scores.filter(
      (score) =>
        score.score
          .toString()
          .includes(search) ||
        score.scoreDate
          ?.substring(0, 10)
          .includes(search)
    );

  return (
    <div className="space-y-8 text-white">

      <div>

        <h1 className="text-4xl font-bold">
          Golf Scores
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your latest golf
          scores.
        </p>

      </div>

      <ScoreStats
        scores={scores}
      />

      <ScoreForm
        onSubmit={
          addScore
        }
      />

      <ScoreSearch
        value={search}
        onChange={
          setSearch
        }
      />

      <ScoreList
        loading={
          loading
        }
        scores={
          filtered
        }
        onEdit={
          setEditingScore
        }
        onDelete={
          setDeleteScoreId
        }
      />

      {editingScore && (
        <EditScoreModal
          score={
            editingScore
          }
          onClose={() =>
            setEditingScore(
              null
            )
          }
          onSuccess={
            getScores
          }
        />
      )}

      {deleteScoreId && (
        <DeleteScoreModal
          onClose={() =>
            setDeleteScoreId(
              null
            )
          }
          onDelete={() => {
            deleteScore(
              deleteScoreId
            );

            setDeleteScoreId(
              null
            );
          }}
        />
      )}

    </div>
  );
}