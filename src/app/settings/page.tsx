'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav";
import Paginator from "@/components/common/Pagination/Paginator";
import CommonContainer from "@/components/elements/CommonContainer";
import ContentContainer from "@/components/elements/ContentContainer";
import AppContextProvider from "@/helpers/contexts/AppContextProvider";
import { routes } from "@/lib/routes";
import PrivateView from "@/views/privateView";


export default function Home() {



  return (
    <AppContextProvider>
        <PrivateView>
          <CommonContainer>
            <BreadCrumbNav breadCrumbItems={[
              {
                title : 'Dashboard',
                href : '/'
              },
              {
                title : 'Settings',
                href : routes.SETTINGS_INDEX
              },
            ]}/>
            <ContentContainer>
              {/* <MultiStepForm steps={steps} renderContent={renderContent}/> */}
              Hello
            </ContentContainer>
            <div className="mt-4 w-fit ml-auto">
              <Paginator 
                currentPage={1}
                totalPages={10}
                showPreviousNext
                mutate={() => {}}
              />
            </div>
          </CommonContainer>
        </PrivateView>
    </AppContextProvider>
  );
}
