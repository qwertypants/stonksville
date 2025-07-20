/**
 * Simple placeholder for a user settings page. The route is protected by
 * Clerk, so unauthenticated users will be redirected to sign up.
 */
export default function SettingsPage() {
  return (
    <main className=" ">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <p className="text-xl">
        👋🏽 Visiting this page without logging in will redirect to you sign.
        up.{" "}
      </p>
    </main>
  );
}
