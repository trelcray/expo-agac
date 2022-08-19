export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Atividade: {id_curso: string};
            Details: { id_categoria: string, id_curso: string};
            Relatorio: undefined;
            Login: undefined;
            Registrar: undefined;
        }
    }
}