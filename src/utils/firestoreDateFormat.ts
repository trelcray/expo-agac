import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp){
    if(timestamp){
        const date = new Date(timestamp.toDate());

        const day = date.toLocaleDateString('pt-BR');
        const hour = date.toLocaleTimeString('pt-BR');

        return `${day} às ${hour}`
    }
}

export function FormattedDate(timestamp: FirebaseFirestoreTypes.Timestamp){
    if(timestamp){
        const date = new Date(timestamp.toDate());

        const day = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth().toString().padStart(2, "0"))  + "/" + date.getFullYear();

        return day
    }
}

