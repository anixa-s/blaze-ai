
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Flame, 
  BarChart3, 
  AlertTriangle, 
  History, 
  MapPin, 
  Settings,
  Bell
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Risk Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
  },
  {
    title: "Fire Prediction",
    url: createPageUrl("Prediction"),
    icon: Flame,
  },
  {
    title: "Active Alerts",
    url: createPageUrl("Alerts"),
    icon: AlertTriangle,
  },
  {
    title: "Historical Data",
    url: createPageUrl("Historical"),
    icon: History,
  },
  {
    title: "Map View",
    url: createPageUrl("Map"),
    icon: MapPin,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --forest-primary: #1a4d3a;
            --forest-secondary: #2d7a5f;
            --warning-orange: #f97316;
            --danger-red: #dc2626;
            --success-green: #059669;
            --neutral-gray: #6b7280;
            --background-light: #fefefe;
            --surface-white: #ffffff;
            --border-subtle: #e5e7eb;
          }
        `}
      </style>
      <div className="min-h-screen flex w-full" style={{ backgroundColor: 'var(--background-light)' }}>
        <Sidebar className="border-r" style={{ borderColor: 'var(--border-subtle)' }}>
          <SidebarHeader className="border-b p-6" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--forest-primary)' }}
              >
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl" style={{ color: 'var(--forest-primary)' }}>
                  BlazeAI
                </h2>
                <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
                  Wildfire Prediction System
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2" style={{ color: 'var(--neutral-gray)' }}>
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`rounded-lg mb-1 transition-all duration-200 ${
                          location.pathname === item.url 
                            ? 'text-white shadow-sm' 
                            : 'hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: location.pathname === item.url ? 'var(--forest-primary)' : 'transparent'
                        }}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2" style={{ color: 'var(--neutral-gray)' }}>
                System Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success-green)' }}></div>
                    <span style={{ color: 'var(--neutral-gray)' }}>AI Model: Active</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success-green)' }}></div>
                    <span style={{ color: 'var(--neutral-gray)' }}>Weather Data: Live</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--warning-orange)' }}></div>
                    <span style={{ color: 'var(--neutral-gray)' }}>Satellite: Delayed</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--forest-secondary)' }}
              >
                <span className="text-white font-medium text-sm">CA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate" style={{ color: 'var(--forest-primary)' }}>
                  Canada Emergency Mgmt
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--neutral-gray)' }}>
                  Wildfire Response Unit
                </p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-4 md:hidden" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold" style={{ color: 'var(--forest-primary)' }}>
                BlazeAI
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}