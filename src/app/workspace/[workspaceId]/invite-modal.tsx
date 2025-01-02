import { CopyIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-comfirm";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import React from "react";


interface InvietModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    name: string;
    joinCode: string;

}
export const InviteModal = ({
    open,
    setOpen,
    name,
    joinCode
}: InvietModalProps) => {
    const workspaceId = useWorkspaceId();
    const [ ConfirmDialog,confirm] = useConfirm(
        "Are you sure?",
        "This will deactivate the current invite code and generate a new code."
    )
    const {mutate, isPending} = useNewJoinCode()
    const handleCopy = () => {

        const inviteLink = `${window.location.origin}/join/${workspaceId}`;
        window.navigator.clipboard
        .writeText(inviteLink)
        .then(()=>toast.success("Invite link copied to clipboard"))
    };
     const handleNewCode = async(e: React.FormEvent<HTMLElement>)=>{
          const ok = await confirm();
          if(!ok) return;
        e.preventDefault();
        mutate(
            {
                workspaceId
            },
            {
                onSuccess() {
                    toast.success('Invite code regenerated');
                },
                onError(){
                    toast.error('Failed to regenerated invite code');
                }
            }
        )
     }



    return (
        <>
        <ConfirmDialog />
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to {name}
                    </DialogTitle>
                    <DialogDescription>
                        Use the code below to invite people to your workspace
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-4 items-center justify-center py-18">
                    <p className="text-4xl font-bold tracking-widest uppercase">
                        {joinCode}
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                    >
                        Copy link
                        <CopyIcon className="size-4 ml-2" />
                    </Button>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Button disabled={isPending} onClick={handleNewCode} variant={"outline"}>
                        New code
                        <RefreshCcw className="size-4 ml-2"/>
                    </Button>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>

                </div>
            </DialogContent>
        </Dialog  >
        </>
    )
}