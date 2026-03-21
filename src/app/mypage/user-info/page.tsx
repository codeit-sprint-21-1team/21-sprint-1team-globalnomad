"use client";

import PasswordEditSection from "./_components/PasswordEditSection";
import ProfileEditSection from "./_components/ProfileEditSection";

export default function MyProfilePage() {
  return (
    <main>
      <ProfileEditSection />
      <PasswordEditSection />
    </main>
  );
}
