"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import removeParam from "@/shared/utilities/remove-param";

function TopMessageBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [generalMsgType, setGeneralMsgType] = useState<string>("");
  const [generalMsg, setGeneralMsg] = useState<string>("");

  useEffect(() => {
    if (searchParams.get("msgType") && searchParams.get("msg")) {
      setGeneralMsgType(String(searchParams.get("msgType")));
      setGeneralMsg(String(searchParams.get("msg")));

      const path = removeParam(
        ["msgType", "msg"],
        pathname,
        searchParams.toString()
      );
      router.push(path);
    } else {
      setGeneralMsgType("");
    }
  }, [pathname]);

  return (
    <>
      {generalMsgType === "success" && (
        <div className="alertSuccess p-4 mb-2" role="alert">
          <div className="flex justify-center">
            <h3 className="flex">
              <div className="px-1 text-xs sm:text-sm">
                <span className="font-semibold">Success: </span>
                {generalMsg}
              </div>
            </h3>
          </div>
        </div>
      )}

      {generalMsgType === "error" && (
        <div className="alertDanger p-4 mb-2" role="alert">
          <div className="flex justify-center">
            <h3 className="flex">
              <div className="px-1">
                <span className="font-semibold">Error: </span>
                {generalMsg}
              </div>
            </h3>
          </div>
        </div>
      )}
    </>
  );
}

export default TopMessageBar;
