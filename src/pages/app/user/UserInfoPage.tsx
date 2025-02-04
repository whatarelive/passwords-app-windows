import { useState } from "react";
import WebFormTitle from "@/components/webs/WebFormTitle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function UserInfoPage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <section className="px-8 py-10">
      <WebFormTitle title="Perfil de usuario"/>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          {/* <PersonalInfo /> */}
        </TabsContent>
        <TabsContent value="security">
          {/* <SecuritySettings /> */}
        </TabsContent>
        <TabsContent value="activity">
          {/* <ActivityLog /> */}
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default UserInfoPage;