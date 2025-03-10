

export type ImageType = {
    _type:"image";
    asset:{
    _ref:string;
    _type:"reference"
    }
}

export type MiniParish = {
        title: string;
        slug: string;
        image:ImageType;
        dedicatedOn:string;
        deanary:string;
    };

export type PriestDetail = {
    _id:string;
    fullname: string;
    title: "reverend" | "bishop" | "archbishop" | "archbishop_emeritus" | "monsignor";
    email: string;
    thumbnail:ImageType;
    phoneNumber: string;
    ordaninedOn?:string | null;
    parish:MiniParish;
    parish2:MiniParish;
    position:'asst_priest' | 'resident_priest' | 'retired_priest' | 'chaplain' |'administrator' ;
    bio?:Array<{children:{text:string}[]}>;

}

export type ParishType = {
    _id: string;
    title: string;
    slug: string;
    image: ImageType;
    deanary:'emekuku' | 'mbutu_okohia' | 'ogbaku' | 'uzoagba'| 'owerri' |'oguta' |'egbema' | 'ohaji';
    dedicatedOn?:string | null;
    dedicatedBy:PriestDetail;
    isHeadOfDeanary?:boolean;
    type:"parish" | "chaplaincy" | "special_jurisdiction";
    parishPriest:PriestDetail | null;
    chaplain:PriestDetail | null;
    asstParishPriest:PriestDetail | null;
    residentPriest: PriestDetail | null;
    retiredPriest: PriestDetail | null;
    administrator:PriestDetail | null;
    description:Array<{children:{text:string}[]}>;
    images:Array<ImageType> | null;

}