"use client";

import { useState, useRef, FormEvent, useCallback } from "react";
import Image from "next/image";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";

export default function PalmReadingPage() {
  const { loading, checkout } = useCheckout("palm-reading");
  const [image, setImage] = useState<string | null>(null);
  const [amount, setAmount] = useState(1);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [consent, setConsent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Image must be under 8MB.");
      return;
    }

    setUploadError("");
    setUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      setImage(reader.result as string);

      try {
        const res = await fetch("/api/palm-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await res.json();
        if (data.error) {
          setUploadError(data.error);
          setImage(null);
        } else {
          setImageKey(data.imageKey);
        }
      } catch {
        setUploadError("Upload failed. Please try again.");
        setImage(null);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageKey) return;
    const form = e.currentTarget;
    await checkout({
      imageKey,
      handSide: form.handSide.value,
      gender: form.gender.value || undefined,
      ageRange: form.ageRange.value || undefined,
      question: form.question?.value || undefined,
      amount,
    });
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">Palm Reading</h1>
        <p className="text-stone-500 mt-2">
          Upload a photo of your palm for a classical Chinese palmistry analysis
        </p>
        <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">
          $1 contribution
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Palm Photo <span className="text-red-400">*</span>
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              image
                ? "border-stone-300 bg-stone-50"
                : "border-stone-300 hover:border-stone-400 hover:bg-stone-50"
            }`}
          >
            {image ? (
              <Image src={image} alt="Palm preview" width={300} height={200} className="max-h-48 mx-auto rounded-lg object-contain" unoptimized />
            ) : (
              <div>
                <p className="text-sm text-stone-500 mb-1">
                  {uploading ? "Uploading..." : "Click or drag a photo here"}
                </p>
                <p className="text-xs text-stone-400">Make sure your palm lines are clearly visible</p>
                <p className="text-xs text-accent mt-1">Traditionally: gentlemen offer the left palm (男左), ladies the right (女右)</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>
          {uploadError && (
            <p className="text-xs text-red-500 mt-1">{uploadError}</p>
          )}
        </div>

        {/* Hand Side */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Which hand is this? <span className="text-red-400">*</span>
          </label>
          <select name="handSide" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">Select...</option>
            <option value="left">Left Hand · 左手 (先天手 · 男左)</option>
            <option value="right">Right Hand · 右手 (先天手 · 女右)</option>
          </select>
          <p className="text-xs text-stone-400 mt-1">
            In classical palmistry, the dominant hand reflects your innate fate: gentlemen read the left palm (男左), ladies read the right palm (女右). The other hand shows acquired changes.
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Gender (optional)</label>
          <select name="gender" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Age Range (optional)</label>
          <select name="ageRange" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">Prefer not to say</option>
            <option value="under 18">Under 18</option>
            <option value="18-30">18-30</option>
            <option value="30-50">30-50</option>
            <option value="50+">50+</option>
          </select>
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            What would you like to know? (optional)
          </label>
          <input
            name="question"
            placeholder="e.g. What does my career line say?"
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
        </div>

        {/* Privacy Consent */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5"
            required
          />
          <label htmlFor="consent" className="text-xs text-stone-500 leading-relaxed">
            I understand that my palm photo will be processed to generate this reading and will be
            immediately deleted afterward. The image is never stored on disk or shared with third parties.{" "}
            <a href="/privacy" className="underline hover:text-stone-700">Privacy Policy</a>
          </label>
        </div>

        <AmountPicker value={amount} onChange={setAmount} />
        <SubmitButton
          loading={loading || uploading}
          label={uploading ? "Uploading..." : loading ? "Processing..." : "Read My Palm"}
          hasFree={false}
          amount={amount}
        />
      </form>
    </div>
  );
}
