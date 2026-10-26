"use client";

import { useRef } from "react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { WECHAT_URL } from "@/lib/site";

const wechatIcon =
  "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z";

// WeChat contacts are added by scanning, so the footer's WeChat button opens
// the QR code (public/images/brand/wechat-qr.svg, encoding WECHAT_URL) in a
// dialog; on a phone the link beneath it opens WeChat directly. A native
// <dialog>: Escape and a click outside the card close it.
export default function WeChatButton() {
  const { t, language } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  // Chinese readers know the app by its Chinese name.
  const name = language === "zh" ? "微信" : "WeChat";

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={name}
        aria-haspopup="dialog"
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper/70 transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-night"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
          <path d={wechatIcon} />
        </svg>
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="wechat-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[min(22rem,calc(100vw-2.5rem))] border border-paper/10 bg-night p-0 text-paper backdrop:bg-night/75 backdrop:backdrop-blur-sm"
      >
        <div className="relative px-8 pt-10 pb-8 text-center">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label={t.ui.close}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center text-paper/60 transition-colors hover:text-paper"
          >
            <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          <p id="wechat-title" className="eyebrow flex items-center justify-center gap-3 text-gold">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d={wechatIcon} />
            </svg>
            {name}
          </p>

          <div className="mx-auto mt-6 w-fit bg-paper p-5">
            <Image
              src="/images/brand/wechat-qr.svg"
              alt={`${name} QR`}
              width={200}
              height={200}
              unoptimized
              className="h-[200px] w-[200px]"
            />
          </div>

          <p className="body-copy mx-auto mt-6 max-w-[16rem] text-paper/70">{t.footer.wechatScan}</p>

          <a
            href={WECHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-6 inline-flex border border-paper/40 px-6 py-3 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink md:hidden"
          >
            {t.footer.wechatOpen}
          </a>
        </div>
      </dialog>
    </>
  );
}
