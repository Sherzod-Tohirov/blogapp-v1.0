import { SettingsProfile } from "../../../components/Private/SettingsProfile";
import { SettingsPosts } from "../../../components/Private/SettingsPosts";
export const Settings = () => {
    return (
      <>
      <div className="container mx-auto px-3">
          <h1 className="text-center text-4xl text-slate-700 mt-8 mb-12">Settings</h1>
          <div className="flex sm:flex-col md:flex-row gap-6">
             <SettingsProfile />
             <SettingsPosts />
             
          </div>
      </div>
      </>
    )
  }
  