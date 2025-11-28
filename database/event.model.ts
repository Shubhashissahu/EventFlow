import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },

    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },

    venue: { type: String, required: true },
    location: { type: String, required: true },

    date: { type: String, required: true },
    time: { type: String, required: true },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },

    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
  },
  { timestamps: true }
);

// PRE-SAVE HOOK (async version without next parameter)
EventSchema.pre("save", async function () {
  const event = this as IEvent;

  // Auto-generate slug when title changes
  if (event.isModified("title") || !event.slug) {
    event.slug = slugify(event.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  // Validate & convert date to ISO
  if (event.isModified("date")) {
    const parsed = new Date(event.date);
    if (isNaN(parsed.getTime())) {
      throw new Error("Invalid date format");
    }
    event.date = parsed.toISOString();
  }

  // Validate time format
  if (event.isModified("time")) {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(event.time)) {
      throw new Error("Invalid time format (expected HH:mm)");
    }
  }
});

EventSchema.index({ slug: 1 }, { unique: true });

const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;