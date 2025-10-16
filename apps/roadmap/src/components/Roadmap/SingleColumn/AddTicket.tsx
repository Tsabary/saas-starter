import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEntityList, useUser } from "@replyke/react-js";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TITLE_MIN = 10;
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 500;

export default function AddTicket({ columnId }: { columnId: string }) {
  const { user } = useUser();
  const { createEntity } = useEntityList({ listId: columnId });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasTitle = title.trim().length > 0;

  const handleAddPost = async () => {
    if (!user) {
      toast.error("Please log in to submit a ticket");
      return;
    }

    if (!title || title.length < TITLE_MIN || title.length > TITLE_MAX) {
      toast.error("Please add a valid title");
      return;
    }

    if (description.length > DESCRIPTION_MAX) {
      toast.error("Please try to shorten your description");
      return;
    }

    setSubmitting(true);
    await createEntity?.({
      title,
      content: description,
      metadata: {
        stage: "backlog",
      },
    });

    toast.success("Request added successfully!");
    setTitle("");
    setDescription("");
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Add a request.."
        value={title}
        onChange={(e) => {
          if (e.target.value.length <= TITLE_MAX) {
            setTitle(e.target.value);
          }
        }}
        className="shadow-none h-7 bg-white text-xs placeholder:text-xs"
      />

      <AnimatePresence>
        {hasTitle && (
          <>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[10px] text-right text-muted-foreground">
                {TITLE_MAX - title.length} characters left
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Textarea
                placeholder="Add more context (optional)"
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= DESCRIPTION_MAX) {
                    setDescription(e.target.value);
                  }
                }}
                className="bg-white text-xs placeholder:text-xs"
              />
              <div className="text-[10px] text-right text-muted-foreground mt-1">
                {DESCRIPTION_MAX - description.length} characters left
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-1 self-end"
            >
              <Button
                onClick={handleAddPost}
                disabled={submitting}
                size="sm"
                className="text-xs h-7"
              >
                {submitting && (
                  <LoaderCircle className="size-4 mr-2 animate-spin" />
                )}
                {submitting ? "Submitting.." : "Submit"}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
