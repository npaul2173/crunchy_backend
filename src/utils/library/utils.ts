class BaseRoute {
    private route: string;

    constructor(routeName: string) {
        this.route = routeName;
    }

    public getRoute(subRouteName: string) {
        return `/${this.route}${subRouteName}`;
    }
}
export { BaseRoute };
