import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import experiencesData from "../data/experiences.json";

interface Position {
  id: number;
  job_position_name: string;
}

interface Experience {
  id: number;
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  positions: Position[];
  position_name: string;
  start_year: number;
  start_month: number;
  end_year: number | null;
  end_month: number | null;
  description: string;
  updated_at: string;
}

function Resume() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const extractSkills = useCallback((exps: Experience[]): string[] => {
    const skillSet = new Set<string>();
    const techRegex =
      /\b(AWS|Docker|Python|Django|TypeScript|Vue|React|Node\.js|JavaScript|Kotlin|Android|iOS|Swift|Java|Crystal|NestJS|MySQL|PostgreSQL|DynamoDB|Redis|MongoDB|Elasticsearch|BigQuery|Lambda|S3|CloudFormation|CloudFront|Route53|ECR|ECS|CircleCI|GitHub Actions|GitLab|Bitbucket|Selenium|Terraform|Kubernetes|Firebase|Figma|Jira|Vite|Tailwind CSS)\b/gi;

    for (const exp of exps) {
      if (exp.description) {
        const matches = exp.description.match(techRegex);
        if (matches) {
          for (const skill of matches) {
            skillSet.add(skill);
          }
        }
      }
    }

    return Array.from(skillSet);
  }, []);

  useEffect(() => {
    const sortedExperiences = [...experiencesData.experience_list].sort(
      (a, b) => {
        const aDate = a.start_year * 12 + a.start_month;
        const bDate = b.start_year * 12 + b.start_month;
        return bDate - aDate;
      }
    );

    setExperiences(sortedExperiences);
    setSkills(extractSkills(sortedExperiences));
    setLoading(false);
  }, [extractSkills]);

  const formatDate = (
    year: number,
    month: number,
    endYear: number | null,
    endMonth: number | null
  ): string => {
    if (!year) return "";

    const startDate = `${year}/${String(month).padStart(2, "0")}`;

    if (!endYear || endYear === 0) {
      return `${startDate} - Present`;
    }

    const endDate = `${endYear}/${String(endMonth).padStart(2, "0")}`;
    return `${startDate} - ${endDate}`;
  };

  const formatDescription = (description: string): React.ReactElement[] => {
    if (!description) return [];

    return description
      .split("\n")
      .map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;

        if (line.startsWith("●") || line.startsWith("*")) {
          return (
            <li key={`${index}-disc`} className="ml-4 list-disc">
              {line.substring(1).trim()}
            </li>
          );
        }
        if (line.startsWith("　　■") || line.startsWith("    *")) {
          return (
            <li key={`${index}-sub`} className="ml-8 text-sm list-circle">
              {line.replace(/^[　■\s*]+/, "")}
            </li>
          );
        }
        if (line.startsWith("　○") || line.startsWith("  *")) {
          return (
            <li key={`${index}-circle`} className="ml-6 list-circle">
              {line.replace(/^[　○\s*]+/, "")}
            </li>
          );
        }
        return (
          <p key={`${index}-para`} className="mb-1">
            {trimmedLine}
          </p>
        );
      })
      .filter(Boolean) as React.ReactElement[];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 text-slate-200">
      <nav className="p-6 border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              tkt
            </h1>
            <p className="text-2xl text-purple-300 animate-fade-in animation-delay-100">
              Web Application Developer
            </p>
            <p className="text-lg text-slate-400 mt-2 animate-fade-in animation-delay-200">
              Japan 🇯🇵
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>

            {loading ? (
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg p-6 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse"
                  >
                    <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      <div className="absolute left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 shadow-lg shadow-purple-500/50" />
                      <div
                        className="ml-16 rounded-lg p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {exp.position_name}
                            </h3>
                            <p className="text-lg text-purple-300">
                              {exp.organization_name}
                              {exp.is_client_work &&
                                exp.client_company_name && (
                                  <span className="text-sm text-slate-400 ml-2">
                                    ({exp.client_company_name})
                                  </span>
                                )}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {exp.positions.map((pos) => (
                                <span
                                  key={pos.id}
                                  className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30"
                                >
                                  {pos.job_position_name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 mt-2 md:mt-0 font-mono">
                            {formatDate(
                              exp.start_year,
                              exp.start_month,
                              exp.end_year,
                              exp.end_month
                            )}
                          </p>
                        </div>
                        {exp.description && (
                          <div className="text-slate-300 space-y-1 text-sm">
                            {formatDescription(exp.description)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm text-purple-200 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-slate-400 border-t border-white/10 backdrop-blur-lg bg-black/20">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            LAPRAS
          </a>
        </p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Resume;
