'use client'

import CommonContainer from "@/components/elements/CommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { Separator } from "@/components/ui/separator"
import AccountForm from "./_partials/Account"

const AccountSettingIndexPage :React.FC = () => {
    return(
        <>
            <CommonContainer className="pt-0">
                <ContentContainer className="!mt-0 !pt-2">
                    <div>
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground">
                        This is how others will see you on the site.
                        </p>
                    </div>
                    <Separator className="my-4"/>
                    <div>
                        <AccountForm />
                    </div>
                </ContentContainer>
            </CommonContainer>
        </>
    )
}

export default AccountSettingIndexPage