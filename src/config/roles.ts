type Role = 'user' | 'admin';

const allRoles: Record<Role, string[]> = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles: Role[] = Object.keys(allRoles) as Role[];
const roleRights: Map<Role, string[]> = new Map(
  Object.entries(allRoles).map(([key, value]) => [key as Role, value])
);

export { roles, roleRights };