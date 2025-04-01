import React, { useState } from "react";
import { agreementData } from "../data/sampleAgreement";
import { AgreementProvider } from "../context/AgreementContext";
import { BlockRenderer } from "./BlockRenderer";
import { Block } from "../types/content";

function AgreementContent() {
  let clauseCount = 0;
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {agreementData.map((section, i) => (
        <div key={i} className="mb-6 flex flex-col gap-4">
          {section.children?.map((child, j) => {
            if ((child as Block).type === "clause") {
              clauseCount++;
            }
            return (
              <BlockRenderer key={j} block={child} index={j} clauseCount={clauseCount} />
            )
          })}
        </div>
      ))}
    </div>
  );
}



export default function AgreementRenderer({ value }: { value?: object  }) {
  return (
    <AgreementProvider value={value}>
      <AgreementContent />
    </AgreementProvider>
  );
} 