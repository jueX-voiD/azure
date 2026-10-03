import { FEATURES } from "@/lib/site";

export default function WhyStandOut() {
  return (
    <section className="bg-[url(/images/why-swirl.svg)] bg-[position:left_center] bg-no-repeat px-5 py-[100px] md:pt-[120px] md:pb-[160px]">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-10 md:flex-row md:justify-between md:gap-5">
        <h2 className="text-fluid-h2 w-full max-w-[432px] text-center font-normal text-marine md:w-[432px]">
          Why we stand out?
        </h2>
        <div className="flex w-full flex-col gap-9 text-center md:w-[610px] md:gap-[72px] md:text-left">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col gap-6">
              <h6 className="text-fluid-h3 font-normal text-marine">
                {f.title}
              </h6>
              <p className="text-fluid-body font-light text-seaglass">
                {"systemFont" in f ? (
                  <span className="font-[family-name:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
                    {f.body}
                  </span>
                ) : (
                  f.body
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
