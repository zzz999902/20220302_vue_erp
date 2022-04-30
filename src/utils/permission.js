/**
 * 存储的是 角色对应的权限名称
 */
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    }, {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
  ],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} 用户角色
 * @param {Array} 路由信息
 */
export default function getMenuRoute(role, routes) {
  // console.log(role, routes);
  const allowRoutesName = roleToRoute[role].map((item) => item.name);// 取到角色有权限的路由信息
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) { // 含有权限
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);// 过滤children有权限的路由
      return true;
    }
    return false;
  });
  return resultRoutes;
}
