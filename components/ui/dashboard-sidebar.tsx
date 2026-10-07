"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  shortcut?: string;
  children?: NavItemData[];
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

function NavItem({
  item,
  activeId,
  onSelect,
  level = 0,
}: {
  item: NavItemData;
  activeId: string;
  onSelect: (id: string) => void;
  level?: number;
}) {
  const isActive = activeId === item.id;
  const hasChildren = !!item.children?.length;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) setIsOpen(!isOpen);
    else onSelect(item.id);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`group flex items-center justify-between px-2.5 py-[7px] rounded-md cursor-pointer transition-all duration-200 select-none ${
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
        style={{ paddingLeft: `${level * 12 + 10}px` }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2.5">
          <item.icon
            className={`w-4 h-4 transition-colors ${
              isActive
                ? "text-accent-foreground"
                : "text-muted-foreground/70 group-hover:text-accent-foreground"
            }`}
            strokeWidth={1.5}
          />
          <span className="text-[13px] tracking-wide truncate">
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {item.shortcut && (
            <kbd className="hidden group-hover:inline-flex items-center justify-center h-5 px-1.5 text-[10px] text-muted-foreground/60 bg-muted border border-border/50 rounded">
              {item.shortcut}
            </kbd>
          )}
          {item.badge != null && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-medium rounded-full bg-secondary text-secondary-foreground">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronRight
              className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
              strokeWidth={2}
            />
          )}
        </div>
      </div>

      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden min-h-0 flex flex-col gap-0.5 mt-0.5">
            {item.children!.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                activeId={activeId}
                onSelect={onSelect}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SidebarNav({
  groups,
  bottomItems,
  activeId,
  onSelect,
  brandName,
  brandSub,
}: {
  groups: NavGroupData[];
  bottomItems: NavItemData[];
  activeId: string;
  onSelect: (id: string) => void;
  brandName: string;
  brandSub?: string;
}) {
  return (
    <div className="flex flex-col w-[260px] h-full bg-card/50 border-r border-border/50 p-3 font-sans">
      <div className="flex items-center gap-3 px-2 py-2 mb-4">
        <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-semibold text-[13px] shadow-sm">
          {brandName.charAt(0)}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-medium leading-none mb-1 text-foreground truncate max-w-[160px]">
            {brandName}
          </span>
          {brandSub && (
            <span className="text-[11px] text-muted-foreground leading-none">
              {brandSub}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {groups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {group.heading && (
              <span className="px-2.5 mb-1 text-[11px] font-semibold tracking-wider text-muted-foreground/50 uppercase">
                {group.heading}
              </span>
            )}
            {group.items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                activeId={activeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-0.5">
        {bottomItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
