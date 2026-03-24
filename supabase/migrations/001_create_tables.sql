-- ToDoA Phase 1 Schema

create table if not exists projects (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  project_id uuid references projects(id) on delete set null,
  priority   smallint not null default 4 check (priority between 1 and 4),
  due_date   date,
  completed  boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_tasks_project_id on tasks(project_id);
create index if not exists idx_tasks_due_date   on tasks(due_date);

-- Allow anonymous access (no auth in Phase 1)
alter table projects enable row level security;
alter table tasks    enable row level security;

create policy "Allow all on projects" on projects for all using (true) with check (true);
create policy "Allow all on tasks"    on tasks    for all using (true) with check (true);
