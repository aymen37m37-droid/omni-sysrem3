import { useAuth } from "@/components/auth-provider";
import { useLogout } from "@workspace/api-client-react";
import { useLocation, Link } from "wouter";
import {
  LogOut,
  LayoutDashboard,
  Package,
  Tags,
  Receipt,
  Users,
  UserCircle,
  BarChart3,
  Settings,
  FileText,
  UserCheck,
  RotateCcw,
  Calculator,
  KeyRound,
  Utensils,
  Clock,
  Truck,
  Wallet,
  Coins,
  Building,
  Palette,
  Cpu,
  ShieldCheck,
  Boxes,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppIcon } from "./AppLogo";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const [location] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("pos_token");
        window.location.href = "/login";
      }
    });
  };

  const navGroups = [
    {
      title: "العمليات والمبيعات",
      items: [
        { name: "لوحة القيادة", href: "/dashboard", icon: LayoutDashboard },
        { name: "نقطة البيع (POS)", href: "/pos", icon: Receipt },
        { name: "الطلبات والمبيعات", href: "/orders", icon: ShoppingBag },
        { name: "الصالات والطاولات", href: "/tables", icon: Utensils },
        { name: "الورديات والصندوق", href: "/shifts", icon: Clock },
        { name: "المرتجعات والخزينة", href: "/returns", icon: RotateCcw },
      ]
    },
    {
      title: "المخزون والمشتريات",
      items: [
        { name: "الأصناف والمنتجات", href: "/products", icon: Package },
        { name: "التصنيفات", href: "/categories", icon: Tags },
        { name: "حركة وتكلفة المخزون", href: "/inventory", icon: Boxes },
        { name: "الموردين والمشتريات", href: "/suppliers", icon: Truck },
      ]
    },
    {
      title: "الأنظمة المالية والحسابات",
      items: [
        { name: "المحاسبة والسندات", href: "/accounting", icon: Calculator },
        { name: "إدارة العملاء والذمم", href: "/customers", icon: Users },
        { name: "المصروفات التشغيلية", href: "/expenses", icon: Wallet },
        { name: "العملات وأسعار الصرف", href: "/currencies", icon: Coins },
        { name: "الموارد البشرية والرواتب", href: "/hr", icon: UserCheck },
        { name: "التقارير الشاملة", href: "/reports", icon: BarChart3 },
      ]
    },
    {
      title: "تهيئة النظام والأنظمة المتكاملة",
      badge: "Omni Pro",
      items: [
        { name: "تكامل Omni System Pro", href: "/onyx-erp", icon: Cpu, highlight: true },
        { name: "الفروع والمستودعات", href: "/branches", icon: Building },
        { name: "تصميم الترويسة والشعار", href: "/document-print-settings", icon: Palette },
        { name: "سجل الطباعة والوثائق", href: "/print-log", icon: FileText },
        { name: "سجل الرقابة والعمليات", href: "/audit", icon: ShieldCheck },
        { name: "المستخدمين والصلاحيات", href: "/users", icon: UserCircle },
        { name: "إدارة التراخيص والتفعيل", href: "/licenses", icon: KeyRound },
        { name: "إعدادات النظام العامة", href: "/settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-l border-sidebar-border shadow-md">
        {/* Top App Header */}
        <div className="h-16 flex items-center justify-between border-b border-sidebar-border px-4 bg-sidebar/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border border-sidebar-border/60 overflow-hidden flex items-center justify-center bg-white p-0.5 shadow-xs">
              <AppIcon className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-sidebar-primary-foreground leading-none">إتقان سوفت</h1>
              <span className="text-[10px] text-amber-500 font-bold tracking-wider">Omni System Pro</span>
            </div>
          </div>
        </div>
        
        {/* Nav Items Container */}
        <div className="flex-1 py-3 px-2.5 overflow-y-auto space-y-5 scrollbar-thin">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-extrabold text-sidebar-foreground/50 uppercase tracking-wider">
                <span>{group.title}</span>
                {group.badge && (
                  <span className="bg-amber-500/20 text-amber-500 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                    {group.badge}
                  </span>
                )}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
                  
                  return (
                    <Link key={item.href} href={item.href}>
                      <div className={cn(
                        "flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer group",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-xs font-bold" 
                          : item.highlight
                          ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 font-bold border border-amber-500/20"
                          : "hover:bg-sidebar-accent/60 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                      )}>
                        <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70")} />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Profile & Logout Section */}
        <div className="p-3 border-t border-sidebar-border bg-sidebar/40 shrink-0">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
              {user?.name ? user.name.charAt(0) : "م"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">{user?.name || "مدير النظام"}</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{user?.role === 'admin' ? 'مدير النظام المالي' : 'كاشير مبيعات'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-bold border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content View Container */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </main>
    </div>
  );
}

