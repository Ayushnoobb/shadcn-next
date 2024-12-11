'use client'

import CommonContainer from "@/components/elements/CommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { Separator } from "@/components/ui/separator"
import AppearanceForm from "./_partials/AppearanceForm"

const AccountSettingIndexPage : React.FC = () => {
    return(
        <>
            <CommonContainer className="pt-0">
                <ContentContainer className="!mt-0 !pt-2">
                    <div>
                        <h3 className="text-lg font-medium">Appearance</h3>
                        <p className="text-sm text-muted-foreground">
                            Change Appearance of your website as per your need
                        </p>
                    </div>
                    <Separator className="my-4"/>
                    <div>
                        <AppearanceForm />
                    </div>
                </ContentContainer>
            </CommonContainer>
        </>
    )
}

export default AccountSettingIndexPage