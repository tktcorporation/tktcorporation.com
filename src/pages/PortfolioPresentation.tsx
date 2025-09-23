/**
 * Purpose:
 * Spectacleベースのポートフォリオプレゼンテーションコンポーネント。
 * 高品質なPDF出力と洗練されたプレゼンテーション機能を提供。
 *
 * Context:
 * - Spectacleライブラリを使用したプロフェッショナルなスライド機能
 * - Tailwindのスタイルを活用しつつSpectacleテーマと統合
 * - PDF出力時に適切なレイアウトとスタイルを保持
 * - キーボードショートカットとナビゲーション機能
 */

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Box,
  Deck,
  FlexBox,
  FullScreen,
  Grid,
  Heading,
  Image,
  Link,
  ListItem,
  Notes,
  Progress,
  Slide,
  Text,
  UnorderedList,
} from "spectacle";

// カスタムテーマ定義（Tailwindカラーと統合）
const theme = {
  colors: {
    primary: "#1f2937", // gray-900
    secondary: "#4b5563", // gray-700
    tertiary: "#6b7280", // gray-600
    quaternary: "#9ca3af", // gray-500
    quinary: "#d1d5db", // gray-400
    background: "#ffffff",
    text: "#1f2937",
  },
  fonts: {
    header:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    text: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    monospace: '"Roboto Mono", Consolas, "Courier New", monospace',
  },
  fontSizes: {
    h1: "72px",
    h2: "60px",
    h3: "48px",
    h4: "36px",
    h5: "24px",
    text: "20px",
    monospace: "18px",
  },
  lineHeights: {
    h1: "1.1",
    h2: "1.2",
    h3: "1.3",
    h4: "1.4",
    h5: "1.5",
    text: "1.6",
  },
  space: [0, 4, 8, 16, 32, 64],
};

// カスタムコンポーネント: スキルタグ
const SkillTag = ({ children }: { children: React.ReactNode }) => (
  <Box
    style={{
      display: "inline-block",
      padding: "8px 16px",
      backgroundColor: "#f3f4f6",
      color: "#4b5563",
      borderRadius: "9999px",
      fontSize: "14px",
      fontWeight: 300,
      margin: "4px",
    }}
  >
    {children}
  </Box>
);

// カスタムコンポーネント: セクションヘッダー
const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <FlexBox flexDirection="column" alignItems="center" marginBottom={32}>
    <Heading fontSize="h2" color="primary" style={{ fontWeight: 300 }}>
      {title}
    </Heading>
    {subtitle && (
      <Text fontSize="text" color="secondary" style={{ fontWeight: 300 }}>
        {subtitle}
      </Text>
    )}
    <Box
      style={{
        width: "64px",
        height: "1px",
        backgroundColor: "#d1d5db",
        marginTop: "24px",
      }}
    />
  </FlexBox>
);

const PortfolioPresentation = () => {
  const [exportMode, setExportMode] = useState(false);

  // PDF出力モード判定（URLパラメータをチェック）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setExportMode(params.get("export") === "pdf");
  }, []);

  return (
    <Deck
      theme={theme}
      template={() => (
        <Box position="absolute" left={0} right={0} bottom={0} height={5}>
          <FullScreen size={30} color="#9ca3af" />
          <Progress color="#1f2937" />
        </Box>
      )}
    >
      {/* スライド1: タイトル */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading
            fontSize="h1"
            color="primary"
            style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
          >
            tktcorporation
          </Heading>
          <Text
            fontSize="h4"
            color="secondary"
            style={{ fontWeight: 300, marginTop: "24px" }}
          >
            Software Engineer / Product Manager
          </Text>
        </FlexBox>
        <Notes>
          ポートフォリオプレゼンテーションのタイトルスライド。
          名刺代わりとして活用可能な自己紹介ツール。
        </Notes>
      </Slide>

      {/* スライド2: Capabilities */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <SectionHeader
            title="Capabilities"
            subtitle="ソフトウェアの企画から開発、リリース、グロースまで"
          />

          <Box marginTop={32}>
            {/* Engineering */}
            <Box textAlign="center" marginBottom={24}>
              <Text
                fontSize="h5"
                color="primary"
                style={{ marginBottom: "16px", fontWeight: 500 }}
              >
                Engineering
              </Text>
              <FlexBox justifyContent="center" flexWrap="wrap">
                <SkillTag>Webサイト / Webアプリ開発</SkillTag>
                <SkillTag>iOS / Androidアプリ開発</SkillTag>
                <SkillTag>Mac / Windowsアプリ開発</SkillTag>
              </FlexBox>
            </Box>

            {/* Project Management */}
            <Box textAlign="center" marginBottom={24}>
              <Text
                fontSize="h5"
                color="primary"
                style={{ marginBottom: "16px", fontWeight: 500 }}
              >
                Project Management
              </Text>
              <FlexBox justifyContent="center" flexWrap="wrap">
                <SkillTag>スケジュール管理</SkillTag>
                <SkillTag>チーム調整</SkillTag>
                <SkillTag>ステークホルダー対応</SkillTag>
                <SkillTag>リスク管理</SkillTag>
                <SkillTag>進捗可視化</SkillTag>
              </FlexBox>
            </Box>

            {/* Product Management */}
            <Box textAlign="center">
              <Text
                fontSize="h5"
                color="primary"
                style={{ marginBottom: "16px", fontWeight: 500 }}
              >
                Product Management
              </Text>
              <FlexBox justifyContent="center" flexWrap="wrap">
                <SkillTag>KPI設定・分析</SkillTag>
                <SkillTag>開発企画</SkillTag>
                <SkillTag>リリース計画策定</SkillTag>
                <SkillTag>ユーザー分析</SkillTag>
                <SkillTag>グロースハック</SkillTag>
              </FlexBox>
            </Box>
          </Box>
        </FlexBox>
      </Slide>

      {/* スライド3: B2Cプロダクトマネージャー経験 */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box textAlign="center" marginBottom={48}>
            <Text
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              2025 - 現在
            </Text>
            <Heading
              fontSize="h2"
              color="primary"
              style={{ fontWeight: 300, marginBottom: "24px" }}
            >
              toC Webプロダクト開発
            </Heading>
            <FlexBox justifyContent="center" alignItems="center">
              <SkillTag>フルタイム</SkillTag>
              <Text
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300, marginLeft: "16px" }}
              >
                プロダクトマネージャー
              </Text>
            </FlexBox>
          </Box>

          <Grid gridTemplateColumns="1fr 1fr" gridGap={32}>
            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                主な責任
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>KPI設定に基づいた機能企画</ListItem>
                <ListItem>リリース計画の策定と実行管理</ListItem>
                <ListItem>グロース施策の企画・実行・効果測定</ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                成果・インパクト
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>ユーザー獲得・維持率の改善施策実行</ListItem>
                <ListItem>
                  機能リリースによるWAU向上 / メールパフォーマンス改善
                </ListItem>
                <ListItem>PdM2人,開発者4人 チームでのスクラム開発</ListItem>
                <ListItem>必要に応じて開発者としても稼働</ListItem>
              </UnorderedList>
            </Box>
          </Grid>
        </FlexBox>
      </Slide>

      {/* スライド4: フルスタックエンジニア経験 */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box textAlign="center" marginBottom={48}>
            <Text
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              2020 - 2025
            </Text>
            <Heading
              fontSize="h2"
              color="primary"
              style={{ fontWeight: 300, marginBottom: "24px" }}
            >
              toB SaaS Webプロダクト開発
            </Heading>
            <FlexBox justifyContent="center" alignItems="center">
              <SkillTag>フルタイム</SkillTag>
              <Text
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300, marginLeft: "16px" }}
              >
                Webアプリケーションエンジニア
              </Text>
            </FlexBox>
          </Box>

          <Grid gridTemplateColumns="1fr 1fr" gridGap={32}>
            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                技術的な担当領域
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>フロントエンド・バックエンド開発</ListItem>
                <ListItem>RESTful API設計と実装</ListItem>
                <ListItem>AWS インフラ構築と運用</ListItem>
                <ListItem>データベース設計・最適化</ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                ビジネス貢献
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>顧客要件のヒアリングと要件定義</ListItem>
                <ListItem>システム改善提案と実装</ListItem>
                <ListItem>技術課題の解決とパフォーマンス向上</ListItem>
                <ListItem>チーム開発におけるコードレビュー</ListItem>
              </UnorderedList>
            </Box>
          </Grid>
        </FlexBox>
      </Slide>

      {/* スライド5: VRライブ制作 */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box textAlign="center" marginBottom={32}>
            <Text
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              2025
            </Text>
            <Heading
              fontSize="h3"
              color="primary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              サンリオキャラVRライブ制作
            </Heading>
            <Link
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300 }}
            >
              Sanrio Virtual Festival 2025
            </Link>
            <FlexBox justifyContent="center" alignItems="center" marginTop={16}>
              <SkillTag>副業</SkillTag>
              <Text
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300, marginLeft: "16px" }}
              >
                プロジェクトマネージャー補助
              </Text>
            </FlexBox>
          </Box>

          <Grid gridTemplateColumns="auto 1fr" gridGap={32}>
            {exportMode ? null : (
              <Image
                src="/src/assets/vfes2025-artist.png"
                width={288}
                height={384}
                style={{ borderRadius: "8px", backgroundColor: "#f9fafb" }}
              />
            )}

            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                担当業務
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>プロジェクトの進捗管理</ListItem>
                <ListItem>進捗を鑑みた制作スコープの調整</ListItem>
                <ListItem>プロジェクト管理ツールの選定・セットアップ</ListItem>
                <ListItem>技術的な課題解決のサポート</ListItem>
              </UnorderedList>

              <Box marginTop={24}>
                <Link
                  href="https://v-fes.sanrio.co.jp/"
                  target="_blank"
                  fontSize="text"
                  color="secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 300,
                  }}
                >
                  <ExternalLink size={16} style={{ marginRight: "8px" }} />
                  公式サイト: Sanrio Virtual Festival
                </Link>
              </Box>
            </Box>
          </Grid>
        </FlexBox>
      </Slide>

      {/* スライド6: コンテンツ軽量化 */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box textAlign="center" marginBottom={32}>
            <Text
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              2025
            </Text>
            <Heading
              fontSize="h3"
              color="primary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              既存VRコンテンツ軽量化
            </Heading>
            <Link
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300 }}
            >
              Sanrio Virtual Festival 2025
            </Link>
            <FlexBox justifyContent="center" alignItems="center" marginTop={16}>
              <SkillTag>副業</SkillTag>
              <Text
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300, marginLeft: "16px" }}
              >
                プロジェクトマネージャー
              </Text>
            </FlexBox>
          </Box>

          <Grid gridTemplateColumns="auto 1fr" gridGap={32}>
            {exportMode ? null : (
              <Image
                src="/src/assets/vfes2025-optimise.png"
                width={288}
                height={384}
                style={{ borderRadius: "8px", backgroundColor: "#f9fafb" }}
              />
            )}

            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                責務・役割
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>進行管理</ListItem>
                <ListItem>要件/着地点のすり合わせ</ListItem>
                <ListItem>先方Unityエンジニアとの技術的調整</ListItem>
                <ListItem>軽量化前後の品質確認</ListItem>
              </UnorderedList>

              <Box marginTop={24}>
                <FlexBox flexDirection="column" alignItems="flex-start">
                  <Link
                    href="https://v-fes.sanrio.co.jp/"
                    target="_blank"
                    fontSize="14px"
                    color="secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 300,
                      marginBottom: "8px",
                    }}
                  >
                    <ExternalLink size={16} style={{ marginRight: "8px" }} />
                    公式サイト
                  </Link>
                  <Link
                    href="https://x.com/QuestMaker_/status/1970336011558498585"
                    target="_blank"
                    fontSize="14px"
                    color="secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 300,
                      marginBottom: "8px",
                    }}
                  >
                    <ExternalLink size={16} style={{ marginRight: "8px" }} />
                    制作担当しました
                  </Link>
                  <Link
                    href="https://x.com/SANRIO_Vfes/status/1960266010264764865"
                    target="_blank"
                    fontSize="14px"
                    color="secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 300,
                    }}
                  >
                    <ExternalLink size={16} style={{ marginRight: "8px" }} />
                    コンテンツ告知
                  </Link>
                </FlexBox>
              </Box>
            </Box>
          </Grid>
        </FlexBox>
      </Slide>

      {/* スライド7: イベントカレンダー制作 */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box textAlign="center" marginBottom={32}>
            <Text
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              2025
            </Text>
            <Heading
              fontSize="h3"
              color="primary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              イベントカレンダーシステム開発
            </Heading>
            <Link
              href="https://v-fes.sanrio.co.jp/"
              target="_blank"
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300 }}
            >
              Sanrio Virtual Festival 2025
            </Link>
            <FlexBox justifyContent="center" alignItems="center" marginTop={16}>
              <SkillTag>副業</SkillTag>
              <Text
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300, marginLeft: "16px" }}
              >
                プロジェクトマネージャー
              </Text>
            </FlexBox>
          </Box>

          <Grid gridTemplateColumns="auto 1fr" gridGap={32}>
            {exportMode ? null : (
              <Image
                src="/src/assets/vfes2025-comm-calendar.png"
                width={288}
                height={384}
                style={{ borderRadius: "8px", backgroundColor: "#f9fafb" }}
              />
            )}

            <Box>
              <Text
                fontSize="text"
                color="primary"
                style={{ fontWeight: 500, marginBottom: "12px" }}
              >
                責務・役割
              </Text>
              <UnorderedList
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300 }}
              >
                <ListItem>要件ヒアリング / 仕様策定</ListItem>
                <ListItem>UIデザイン</ListItem>
                <ListItem>Web/データ配信基盤実装</ListItem>
                <ListItem>Unity側実装調整</ListItem>
                <ListItem>オンボーディングドキュメント作成</ListItem>
                <ListItem>顧客への説明・サポート</ListItem>
              </UnorderedList>
            </Box>
          </Grid>
        </FlexBox>
      </Slide>

      {/* スライド8: VRChatゲーム開発 */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box textAlign="center" marginBottom={48}>
            <Text
              fontSize="text"
              color="quaternary"
              style={{ fontWeight: 300, marginBottom: "16px" }}
            >
              2025 - 現在
            </Text>
            <Heading
              fontSize="h2"
              color="primary"
              style={{ fontWeight: 300, marginBottom: "24px" }}
            >
              VRChatゲームワールド開発
            </Heading>
            <FlexBox justifyContent="center" alignItems="center">
              <SkillTag>副業</SkillTag>
              <Text
                fontSize="text"
                color="tertiary"
                style={{ fontWeight: 300, marginLeft: "16px" }}
              >
                PM補助 / 仕様・ロードマップ策定
              </Text>
            </FlexBox>
          </Box>

          <Box maxWidth="800px" margin="0 auto">
            <Text
              fontSize="text"
              color="primary"
              style={{ fontWeight: 500, marginBottom: "12px" }}
            >
              担当業務
            </Text>
            <UnorderedList
              fontSize="text"
              color="tertiary"
              style={{ fontWeight: 300 }}
            >
              <ListItem>要件ヒアリングと仕様決定</ListItem>
              <ListItem>リリースに向けたロードマップ策定</ListItem>
              <ListItem>ビデオコンテの制作</ListItem>
              <ListItem>チームメンバーへの作業割り当て</ListItem>
            </UnorderedList>
          </Box>
        </FlexBox>
      </Slide>
    </Deck>
  );
};

export default PortfolioPresentation;
