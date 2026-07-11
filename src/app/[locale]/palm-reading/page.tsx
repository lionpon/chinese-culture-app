"use client";

import { useState, useRef, FormEvent, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import { Link } from "@/navigation";

export default function PalmReadingPage() {
 const t = useTranslations("palm");
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
 setUploadError(t("errors.noImage"));
 return;
 }
 if (file.size > 8 * 1024 * 1024) {
 setUploadError(t("errors.tooBig"));
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
 setUploadError(t("errors.uploadFailed"));
 setImage(null);
 } finally {
 setUploading(false);
 }
 };
 reader.readAsDataURL(file);
 }, [t]);

 function handleDrop(e: React.DragEvent) {
 e.preventDefault();
 const file = e.dataTransfer.files[0];
 if (file) handleFile(file);
 }

 async function handleSubmit(e: FormEvent<HTMLFormElement>) {
 e.preventDefault();
 if (!imageKey) return;
 const form = e.currentTarget;
 const pmethod = form.dataset.paymentMethod as "paypal" | "card" | undefined;
 await checkout({
 imageKey,
 handSide: form.handSide.value,
 gender: form.gender.value || undefined,
 ageRange: form.ageRange.value || undefined,
 question: form.question?.value || undefined,
 amount,
 }, pmethod);
 }

 return (
 <div className="max-w-lg mx-auto">
 <div className="text-center mb-8">
 <h1 className="text-2xl sm:text-3xl font-bold text-accent">{t("title")}</h1>
 <p className="text-stone-500 mt-2">{t("subtitle")}</p>
 <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">{t("badge")}</p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
 <div>
 <label className="block text-sm font-medium text-stone-700 mb-2">
 {t("form.photo")} <span className="text-red-400">*</span>
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
 {uploading ? t("form.uploading") : t("form.uploadText")}
 </p>
 <p className="text-xs text-stone-400">{t("form.helperLines")}</p>
 <p className="text-xs text-accent mt-1">{t("form.helperHand")}</p>
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

 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">
 {t("form.whichHand")} <span className="text-red-400">*</span>
 </label>
 <select name="handSide" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
 <option value="">{t("form.handPlaceholder")}</option>
 <option value="left">{t("form.leftHand")}</option>
 <option value="right">{t("form.rightHand")}</option>
 </select>
 <p className="text-xs text-stone-400 mt-1">{t("form.handHelper")}</p>
 </div>

 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.gender")}</label>
 <select name="gender" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
 <option value="">{t("form.preferNot")}</option>
 <option value="male">{t("form.male")}</option>
 <option value="female">{t("form.female")}</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.age")}</label>
 <select name="ageRange" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
 <option value="">{t("form.preferNot")}</option>
 <option value="under 18">{t("form.under18")}</option>
 <option value="18-30">{t("form.age18_30")}</option>
 <option value="30-50">{t("form.age30_50")}</option>
 <option value="50+">{t("form.age50plus")}</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.question")}</label>
 <input
 name="question"
 placeholder={t("form.questionPlaceholder")}
 className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
 />
 </div>

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
 {t("form.consent")}{" "}
 <Link href="/privacy" className="underline hover:text-stone-700">{t("form.consentLink")}</Link>
 </label>
 </div>

 <AmountPicker value={amount} onChange={setAmount} />
 <SubmitButton
 loading={loading || uploading}
 label={uploading ? t("form.uploading") : loading ? t("form.processing") : t("form.submit")}
 hasFree={false}
 
 />
 </form>
 </div>
 );
}
