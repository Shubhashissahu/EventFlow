import mongoose, { Schema, Document, Model } from "mongoose";
import EventModel from "./event.model";

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Invalid email format",
      },
    },
  },
  { timestamps: true }
);

// PRE-SAVE HOOK (must be function, not arrow)

BookingSchema.pre("save", async function () {
  // Use mongoose.model to avoid circular dependency
  const Event = mongoose.model("Event");
  const exists = await Event.exists({ _id: this.eventId });

  if (!exists) {
    throw new Error("Invalid eventId: referenced Event does not exist.");
  }
});
// Index for performance
BookingSchema.index({ eventId: 1 });

const BookingModel: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default BookingModel;
