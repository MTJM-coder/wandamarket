import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

const TabsCtx = createContext(null);

function useTabsCtx() {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>.");
  return ctx;
}

/**
 * <Tabs defaultValue="produits"> … </Tabs>
 * Props:
 * - defaultValue: valeur initiale (non contrôlé)
 * - value: valeur contrôlée (optionnel)
 * - onValueChange: callback quand l’onglet change (optionnel)
 */
export function Tabs({ defaultValue, value: controlled, onValueChange, className = "", children }) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;

  const setValue = (v) => {
    if (controlled === undefined) setUncontrolled(v);
    onValueChange?.(v);
  };

  const ctx = useMemo(() => ({ value, setValue }), [value]);

  return (
    <TabsCtx.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}

/**
 * <TabsList> contient les triggers
 */
export function TabsList({ className = "", children }) {
  return (
    <div
      role="tablist"
      className={`inline-flex w-full md:w-auto items-center gap-2 rounded-xl bg-gray-100 p-1 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * <TabsTrigger value="produits">Produits</TabsTrigger>
 */
export function TabsTrigger({ value, className = "", children, disabled }) {
  const { value: active, setValue } = useTabsCtx();
  const selected = active === value;
  const safe = String(value).replace(/\s+/g, "-");
  const id = `tab-${safe}`;
  const controls = `panel-${safe}`;

  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={controls}
      onClick={() => !disabled && setValue(value)}
      disabled={disabled}
      className={`px-3 py-2 text-sm font-medium rounded-lg transition
        ${selected ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-white/60"}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * <TabsContent value="produits"> … </TabsContent>
 * Par défaut, démonte le contenu quand inactif (meilleure perf et évite des états parasites).
 * Passe forceMount={true} si tu veux laisser monté.
 */
export function TabsContent({ value, className = "", children, forceMount = false }) {
  const { value: active } = useTabsCtx();
  const isActive = active === value;
  const safe = String(value).replace(/\s+/g, "-");
  const id = `panel-${safe}`;
  const labelledBy = `tab-${safe}`;

  if (!isActive && !forceMount) return null;

  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={labelledBy}
      className={className}
    >
      {children}
    </div>
  );
}
