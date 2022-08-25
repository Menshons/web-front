import React, {useState} from 'react';
import Button from "../styles/material-ui/components/Button";
import Dialog from "../styles/material-ui/components/Dialog";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import AvatarPreview from "../styles/material-ui/components/AvatarPreview";
import {FriendProp} from "./FriendsList";

import {
    ButtonSection,
    NameSection,
    UserInfoSection,
    UserSection,
    UserTemplateSection
} from "../styles/list/UserList";

interface FriendTemplateProp {
    data: FriendProp
}

const FriendPreview = ({data}: FriendTemplateProp) => {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();

    const handleError = (error: any) => {
        if(error.response) {
            toast.error("Při zpracování požadavku došlo k chybě");
        }
    }

    const removeFriend = () => {
        console.log("Dodělat");
        /*axiosPrivate.delete(`/api/users/${data.user_id}`)
            .then(() => {
                localStorage.setItem("toast", "Účet byl smazán");
                window.location.reload();
            }).catch((error) => {
            handleError(error);
        });*/
    }

    return (
        <UserTemplateSection>
            <UserSection>
                {data.avatar
                    ?
                    <AvatarPreview src={process.env.REACT_APP_BASE_URL + "/images/" + data.avatar} />
                    :
                    <AvatarPreview />
                }
                <UserInfoSection>
                    <NameSection>
                        {data.name} {data.lastName}
                    </NameSection>
                    <div>{data.email}</div>
                </UserInfoSection>

            </UserSection>
            <ButtonSection>
                <Button size="small" variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>Odstranit přítele</Button>
            </ButtonSection>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete odebrat z přátel uživatele ${data.name} ${data.lastName}?`} onAccept={removeFriend} onClose={() => setOpenDeleteModal(false)} />
            </Dialog>
        </UserTemplateSection>
    );
};

export default FriendPreview;

