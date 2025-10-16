import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  handleError,
  ReportReasonKey,
  reportReasons,
  useEntity,
  useCreateReport,
  useUser,
} from "@replyke/react-js";
import { Flag, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../../../lib/utils";

function ReportTicketView({
  hideReportTicketView,
}: {
  hideReportTicketView: () => void;
}) {
  const { user } = useUser();

  const { entity } = useEntity();
  const createEntityReport = useCreateReport({ type: "entity" });

  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState<ReportReasonKey | null>(null);

  const buttonActive = useMemo(() => !!reason && !!entity, [reason, entity]);

  const handleSubmitReport = async () => {
    try {
      if (!entity) throw new Error("No entity to report selected");
      if (!reason) throw new Error("No reason to report selected");
      if (!user) {
        toast("Oops! Login Required");
        return;
      }

      setSubmitting(true);
      await createEntityReport({ targetId: entity.id, reason });
      hideReportTicketView();
      setReason(null);
      toast.success("Report submitted successfully");
    } catch (err) {
      handleError(err, "Submitting report failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white dark:bg-zinc-900 z-30 flex justify-center"
    >
      <button
        onClick={hideReportTicketView}
        className="absolute top-4 right-4 text-gray-900 dark:text-gray-100 hover:opacity-80 transition"
      >
        <X className="size-5" />
      </button>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-lg leading-none font-semibold text-gray-900 dark:text-white">
          <Flag className="size-5 mr-2" />
          Submit a report
        </div>
        <p className="text-gray-600 dark:text-zinc-400 text-sm mt-3">
          Thank you for looking out for our community. Let us know what is
          happening, and we'll look into it.
        </p>
        <div className="flex flex-row flex-wrap gap-1.5 mt-6">
          {Object.entries(reportReasons).map(([key, value], index) => (
            <Button
              onClick={() => setReason(key as ReportReasonKey)}
              size="sm"
              variant="secondary"
              className={cn(
                "px-2.5 py-1 text-xs font-medium",
                key === reason
                  ? "bg-blue-600 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
              )}
              key={index}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="flex-1" />
        <Button
          onClick={handleSubmitReport}
          disabled={!buttonActive}
          className="w-max self-end bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {submitting && <LoaderCircle className="size-4 mr-2 animate-spin" />}
          {submitting ? "Submitting..." : "Submit Report"}
        </Button>
      </div>
    </motion.div>
  );
}

export default ReportTicketView;
