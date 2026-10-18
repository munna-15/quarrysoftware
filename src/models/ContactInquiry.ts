import mongoose, { Schema, type Model } from "mongoose";

export interface IContactInquiry {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  emailSent: boolean;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    service: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Custom Software",
        "AI Solutions",
        "Business Automation",
        "Cloud & Server Solutions",
        "System Integration",
        "Not Sure Yet",
      ],
    },
    budget: {
      type: String,
      enum: [
        "Under $500",
        "$500 – $1,500",
        "$1,500 – $5,000",
        "$5,000+",
        "Not Decided",
      ],
      default: "Not Decided",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 5000,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactInquiry: Model<IContactInquiry> =
  (mongoose.models.ContactInquiry as Model<IContactInquiry>) ||
  mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);

export default ContactInquiry;
