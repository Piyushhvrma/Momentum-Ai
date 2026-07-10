import toast from "react-hot-toast";

export default function confirmAction({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
}) {
  return new Promise((resolve) => {
    const id = toast.custom(
      (t) => (
        <div className={`confirm-toast ${t.visible ? "confirm-toast-in" : "confirm-toast-out"}`}>
          <div>
            <p className="confirm-toast-title">{title}</p>
            <p className="confirm-toast-message">{message}</p>
          </div>
          <div className="confirm-toast-actions">
            <button
              type="button"
              className="btn-ghost btn-small"
              onClick={() => {
                toast.dismiss(id);
                resolve(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger-soft btn-small"
              onClick={() => {
                toast.dismiss(id);
                resolve(true);
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  });
}
