/**
 * Purpose:
 * CompanyGroupCard の職歴詳細アコーディオン挙動を検証する。
 * 詳細はデフォルトで閉じ、展開操作で説明が表示されることを保証する。
 * 閉じた状態でも職種・役職は参照できることを保証する。
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CompanyGroupCard } from "@/components/resume/ExperienceCard";
import type { CompanyGroup, Experience } from "@/types/experience";

function createExperience(
  overrides: Partial<Experience> & Pick<Experience, "id" | "description">
): Experience {
  return {
    organization_name: "Example Corp",
    is_client_work: false,
    client_company_name: "",
    positions: [{ id: 1, job_position_name: "ソフトウェアエンジニア" }],
    position_name: "ソフトウェアエンジニア",
    start_year: 2022,
    start_month: 1,
    end_year: null,
    end_month: null,
    updated_at: "2024-01-01T00:00:00Z",
    ...overrides,
  };
}

function createCompany(experiences: Experience[]): CompanyGroup {
  const first = experiences[0];
  return {
    company_name: "Example Corp",
    overall_start_year: 2022,
    overall_start_month: 1,
    overall_end_year: null,
    overall_end_month: null,
    groups: [
      {
        organization_name: "Example Corp",
        is_client_work: false,
        client_company_name: "",
        total_start_year: first?.start_year ?? 2022,
        total_start_month: first?.start_month ?? 1,
        total_end_year: null,
        total_end_month: null,
        experiences,
      },
    ],
  };
}

const formatDate = (
  year: number,
  month: number,
  endYear: number | null,
  _endMonth: number | null
) => (endYear ? `${year}/${month} - ${endYear}` : `${year}/${month} - Present`);

describe("CompanyGroupCard", () => {
  it("詳細説明はデフォルトで非表示であること", () => {
    const company = createCompany([
      createExperience({
        id: 1,
        description: "TypeScriptでWebアプリを開発した",
      }),
    ]);

    render(
      <CompanyGroupCard
        company={company}
        formatDate={formatDate}
        extractTechTags={() => ["TypeScript"]}
        formatDescription={(desc) => <p>{desc}</p>}
      />
    );

    const toggle = screen.getByRole("button", {
      name: /ソフトウェアエンジニア/,
    });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("TypeScriptでWebアプリを開発した")).toBeNull();
    expect(screen.queryByText("TypeScript")).toBeNull();
  });

  it("閉じた状態でも複数の役職と職種が見えること", () => {
    const company = createCompany([
      createExperience({
        id: 1,
        description: "TypeScriptでWebアプリを開発した",
        position_name: "ソフトウェアエンジニア",
        positions: [
          { id: 1, job_position_name: "Webアプリケーションエンジニア" },
          { id: 2, job_position_name: "プロダクトマネージャー" },
        ],
      }),
    ]);

    render(
      <CompanyGroupCard
        company={company}
        formatDate={formatDate}
        extractTechTags={() => ["TypeScript"]}
        formatDescription={(desc) => <p>{desc}</p>}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /Webアプリケーションエンジニア · プロダクトマネージャー/,
      })
    ).toBeTruthy();
    expect(screen.getByText("ソフトウェアエンジニア")).toBeTruthy();
    expect(screen.queryByText("TypeScriptでWebアプリを開発した")).toBeNull();
  });

  it("アコーディオンを開くと詳細説明が表示されること", () => {
    const company = createCompany([
      createExperience({
        id: 1,
        description: "TypeScriptでWebアプリを開発した",
      }),
    ]);

    render(
      <CompanyGroupCard
        company={company}
        formatDate={formatDate}
        extractTechTags={() => ["TypeScript"]}
        formatDescription={(desc) => <p>{desc}</p>}
      />
    );

    const toggle = screen.getByRole("button", {
      name: /ソフトウェアエンジニア/,
    });
    fireEvent.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("TypeScriptでWebアプリを開発した")).toBeTruthy();
    expect(screen.getByText("TypeScript")).toBeTruthy();
  });

  it("説明がないロールはアコーディオンにしないこと", () => {
    const company = createCompany([
      createExperience({
        id: 1,
        description: "",
      }),
    ]);

    render(
      <CompanyGroupCard
        company={company}
        formatDate={formatDate}
        extractTechTags={() => []}
        formatDescription={(desc) => <p>{desc}</p>}
      />
    );

    expect(
      screen.queryByRole("button", { name: /ソフトウェアエンジニア/ })
    ).toBeNull();
    expect(screen.getByText("ソフトウェアエンジニア")).toBeTruthy();
  });
});
