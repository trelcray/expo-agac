export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Activitie: {id_curso: string};
            Details: { id_categoria: string, id_curso: string};
            activityDetails: { id_categoria: string, id_curso: string, id_atividade: string};
            Login: undefined;
            Register: undefined;
        }
    }
}