import Progress from "@/components/wizard/Progress";
import StepCategoria from "@/components/wizard/StepCategoria";
import StepLayout from "@/components/wizard/StepLayout";
import StepForm from "@/components/wizard/StepForm";

interface Props {
  params: Promise<{ step: "1" | "2" | "3" }>;
}
//
export default async function Page({ params }: Props) {
  const { step } = await params;
  
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col">
      <Progress />
      {step === "1" && <StepCategoria />}
      {step === "2" && <StepLayout />}
      {step === "3" && <StepForm />}
    </main>
  );
}
