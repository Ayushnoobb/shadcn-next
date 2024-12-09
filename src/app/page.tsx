'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav";
import {DataTable} from "@/components/common/DataTable/DataTable";
import Paginator from "@/components/common/Pagination/Paginator";
import CommonContainer from "@/components/elements/CommonContainer";
import ContentContainer from "@/components/elements/ContentContainer";
import AppContextProvider from "@/helpers/contexts/AppContextProvider";
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
                title : 'Dashboard',
                href : '/'
              },
            ]}/>
            <ContentContainer>
              {/* <DataTable /> */}
              hello
            </ContentContainer>
            <div className="mt-4 w-fit ml-auto">
              <Paginator 
                currentPage={1}
                totalPages={10}
                onPageChange={() => {}}
                showPreviousNext
              />
            </div>
          </CommonContainer>
        </PrivateView>
    </AppContextProvider>
  );
}
