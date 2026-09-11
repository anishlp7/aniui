import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  ProfileCard,
  ProfileCardCover,
  ProfileCardAvatar,
  ProfileCardBody,
  ProfileCardHeader,
  ProfileCardBio,
  ProfileCardLocation,
  ProfileCardAction,
} from "@/components/ui/profile-card";

export function MyScreen() {
  return (
    <ProfileCard>
      <ProfileCardCover source={{ uri: "https://images.example.com/cover.jpg" }} />
      <ProfileCardAvatar source="https://images.example.com/avatar.jpg" fallback="AL" />
      <ProfileCardBody>
        <ProfileCardHeader name="Anish Lawrence" handle="@anishlp" />
        <ProfileCardBio>Building AniUI — shadcn/ui for React Native.</ProfileCardBio>
        <ProfileCardLocation label="San Francisco, CA" />
        <ProfileCardAction label="Follow" onPress={() => {}} />
      </ProfileCardBody>
    </ProfileCard>
  );
}`;
const sourceCode = getComponentSource("profile-card");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Card</h1>
        <p className="text-muted-foreground text-lg">Profile card with a cover image, overlapping avatar, location row, and a press-scale action button.</p>
      </div>
      <ShowcaseDocPlayground slug="profile-card" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="profile-card" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/profile-card.tsx" />
      </div>
    </div>
  );
}
