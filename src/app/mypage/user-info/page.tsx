"use client";

import PasswordEditSection from "./_components/PasswordEditSection";
import ProfileEditSection from "./_components/ProfileEditSection";

export default function MyProfilePage() {
  return (
    <div className="flex flex-col gap-[50px] mb-[24px] md:mb-[225px]">
      <ProfileEditSection />
      <PasswordEditSection />
    </div>
  );
}
