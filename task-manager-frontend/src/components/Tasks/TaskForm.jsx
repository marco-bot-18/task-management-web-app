import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
});

export default function TaskForm({ initial = null, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || { title: "", description: "", status: "pending" },
  });

  useEffect(() => {
    reset(initial || { title: "", description: "", status: "pending" });
  }, [initial, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card"
      style={{ marginBottom: "1rem" }}
    >
      <div className="row">
        <div>
          <label>Title</label>
          <input
            className="input"
            placeholder="Task title"
            {...register("title")}
          />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>
        <div>
          <label>Status</label>
          <select {...register("status")}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div style={{ marginTop: ".75rem" }}>
        <label>Description</label>
        <textarea
          className="input"
          rows="3"
          placeholder="Details here..."
          {...register("description")}
        />
      </div>
      <div className="toolbar" style={{ marginTop: ".75rem" }}>
        <div className="spacer" />
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="btn btn-primary" type="submit">
          {initial ? "Update" : "Create"} Task
        </button>
      </div>
    </form>
  );
}
