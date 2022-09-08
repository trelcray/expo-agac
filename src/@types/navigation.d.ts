export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            CurseDetails: {id_curso: string};
            Activity: { id_categoria: string, id_curso: string};
            activityDetails: { id_atividade: string, id_categoria: string, id_curso: string };
            Login: undefined;
            Register: undefined;
        }
    }
}