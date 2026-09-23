import { z } from "zod";

const text = (max: number) =>
  z.string().trim().min(1, "این بخش را تکمیل کنید.").max(max, `حداکثر ${max} کاراکتر مجاز است.`);
const optionalUrl = z
  .string()
  .trim()
  .max(500, "آدرس واردشده بیش از حد طولانی است.")
  .refine((value) => !value || /^https:\/\//i.test(value), "آدرس باید با https:// شروع شود.");

export const defaultConsultants = Array.from({ length: 4 }, () => ({
  name: "نام مشاور",
  role: "عنوان تخصصی",
  bio: "معرفی کوتاه مشاور، تجربه‌های کلیدی و نقشی که در مسیر تحول هوش مصنوعی سازمان‌ها ایفا می‌کند.",
  specialties: ["حوزه تخصصی"],
  imageUrl: "",
  linkedinUrl: "",
}));

export const aboutSchema = z.object({
  title: text(160),
  introduction: text(800),
  mission: text(2000),
  nativeTitle: text(160),
  nativeDescription: text(1200),
  services: z.array(z.object({ title: text(120), description: text(800) })).length(3),
  consultants: z
    .array(
      z.object({
        name: text(100),
        role: text(140),
        bio: text(600),
        specialties: z.array(text(80)).min(1).max(4),
        imageUrl: optionalUrl,
        linkedinUrl: optionalUrl,
      }),
    )
    .length(4)
    .default(defaultConsultants),
  ctaTitle: text(160),
  ctaDescription: text(600),
});
export type AboutContent = z.infer<typeof aboutSchema>;

export const defaultAbout: AboutContent = {
  title: "از استراتژی هوش مصنوعی تا تحول در عمل، کنار سازمان شما هستیم.",
  introduction:
    "Nexation شریک سازمان‌ها در مسیر تحول با هوش مصنوعی است. از سنجش بلوغ و تدوین استراتژی تا طراحی چت‌بات، ایجنت و اجرای راهکار، کمک می‌کنیم هوش مصنوعی وارد کار واقعی سازمان شما شود.",
  mission:
    "مأموریت Nexation کمک به سازمان‌ها برای تبدیل ظرفیت هوش مصنوعی به نتایج واقعی و قابل‌اندازه‌گیری است.\n\nما با سنجش بلوغ و شناخت اهداف، داده‌ها و فرایندهای هر سازمان، استراتژی و نقشه راه متناسب با آن را تدوین می‌کنیم. سپس با طراحی و اجرای راهکارهایی مانند چت‌بات‌ها، ایجنت‌های هوش مصنوعی و خودکارسازی فرایندها، این مسیر را به عمل تبدیل می‌کنیم.",
  nativeTitle: "AI-native شدن، یعنی هوش مصنوعی بخشی از شیوهٔ کار شما باشد.",
  nativeDescription:
    "هدف ما همراهی سازمان‌ها در حرکت به‌سوی سازمانی AI-native است؛ سازمانی که هوش مصنوعی در تصمیم‌گیری، عملیات و شیوهٔ کار تیم‌هایش جای گرفته و به ایجاد ارزش پایدار کمک می‌کند. این مسیر با شناخت مسئله شروع می‌شود، با مشارکت افراد پیش می‌رود و با سنجش نتیجه بهبود پیدا می‌کند.",
  services: [
    {
      title: "شناخت و استراتژی",
      description:
        "بلوغ هوش مصنوعی سازمان را می‌سنجیم، فرصت‌های کاربردی را شناسایی می‌کنیم و با توجه به اهداف، آمادگی داده و اولویت‌های کسب‌وکار، استراتژی و نقشه راه AI را شکل می‌دهیم.",
    },
    {
      title: "ساخت و اجرا",
      description:
        "چت‌بات‌ها، ایجنت‌ها و راهکارهای هوش مصنوعی را متناسب با داده‌ها و فرایندهای سازمان طراحی و اجرا می‌کنیم؛ از نمونه اولیه تا اتصال به ابزارها و استقرار در جریان واقعی کار.",
    },
    {
      title: "تحول و بهبود",
      description:
        "در پذیرش راهکارها و تغییر شیوهٔ کار همراه تیم‌های شما هستیم. نتایج را می‌سنجیم و مسیر را بهبود می‌دهیم تا استفاده از هوش مصنوعی به قابلیتی ماندگار در سازمان تبدیل شود.",
    },
  ],
  consultants: defaultConsultants,
  ctaTitle: "مسیر هوش مصنوعی سازمان شما از کجا شروع می‌شود؟",
  ctaDescription:
    "با سنجش بلوغ، تصویری اولیه از آمادگی سازمان خود به دست آورید؛ یا دربارهٔ مسئله و مسیر همکاری با ما گفت‌وگو کنید.",
};
