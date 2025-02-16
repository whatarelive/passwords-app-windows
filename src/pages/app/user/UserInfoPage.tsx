import { useState } from "react";
import UserInfo from "@/components/user/UserInfo";
import UserSegurity from "@/components/user/UserSegurity";
import UserActivity from "@/components/user/UserActivity";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function UserInfoPage() {
  const [activeTab, setActiveTab] = useState<string>("personal");

  return (
    <section className="px-8 py-10 select-none">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-secondary">
          <TabsTrigger 
            value="personal" 
            className={ activeTab === 'personal' ? "bg-primary" : "bg-transparent" }>
              Información Personal
            </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className={ activeTab === 'security' ? "bg-primary" : "bg-transparent" }>
              Seguridad
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className={ activeTab === 'activity' ? "bg-primary" : "bg-transparent" }>
              Actividad
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <UserInfo />
        </TabsContent>
        <TabsContent value="security">
          <UserSegurity />
        </TabsContent>
        <TabsContent value="activity">
          <UserActivity />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default UserInfoPage;