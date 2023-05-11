import { useMemo } from "react";
import { PrasiEditor, PrasiEditorArg } from "web-types/prasi";
import { useGlobal, useLocal } from "web-utils";
import { itemHasParent } from "../../../../../../../app/web/src/compo/editor/util/item-has-parent";
import { PluginData } from "../form/global";
import { EditorForm } from "./form/editor";
import { EditorFormState } from "./form/form-state";
import { EditorList } from "./list/editor";
import produce from "immer";
import { findByID } from "../../../../../../../app/web/src/compo/editor/util/find-by-id";
import { IContent } from "../../../../../../../app/web/src/compo/editor/panel/item/_type";
import { PluginID } from "../prasi";

export const editor = ({
  useEditor,
  usePage,
  BtnBox,
  config,
  Btn,
  Coditor,
}: PrasiEditorArg): PrasiEditor => {
  return {
    toolbar: () => {
      const ed = useEditor();
      const page = usePage();
      const local = useLocal({
        db: "",
        undoLength: ed.undoRedo?.cursor || 0,
        shouldUpdate: false as any,
        list: null as null | IContent,
      });
      const frmState = useGlobal(EditorFormState);

      let isFormActive = false;
      let isListActive = false;
      if (ed.undoRedo && ed.active) {
        const formParent = itemHasParent(
          ed.active.id,
          ed.undoRedo.current,
          (item) => {
            const royal = item.pluginData?.royal as PluginData;
            if (royal && royal.form) {
              return true;
            }

            return false;
          }
        );

        const listParent = itemHasParent(
          ed.active.id,
          ed.undoRedo.current,
          (item) => {
            const royal = item.pluginData?.royal as PluginData;
            if (royal && royal.list) {
              local.list = item;
              return true;
            }

            return false;
          }
        );
        if (formParent) {
          isFormActive = true;
        }
        if (listParent) {
          isListActive = true;
        }
      }

      if (!frmState.activeDialog) {
        local.shouldUpdate = ed.active;
      }

      const activate = (mode: "form" | "list") => {
        if (ed.undoRedo && ed.active) {
          const parent = itemHasParent(
            ed.active.id,
            ed.undoRedo.current,
            (item) => {
              const royal = item.pluginData?.royal as PluginData;
              if (royal && royal[mode]) {
                return true;
              }

              return false;
            }
          );

          if (parent) {
            ed.active = parent;
            ed.render();
          }
        }
      };

      let listRenderMode: Exclude<PluginData["list"], undefined>["mode"] =
        "live";

      if (local.list) {
        listRenderMode = local.list.pluginData?.royal?.list?.mode || "live";
      }

      const content = useMemo(() => {
        return (
          <>
            <BtnBox
              className={cx(
                css`
                  margin-left: 5px;
                  border-radius: 0px !important;
                  border-top-left-radius: 2px !important;
                  border-bottom-left-radius: 2px !important;
                `
              )}
            >
              <Btn
                tooltip="Add/Edit Form"
                dialogMode="modal"
                className={cx(
                  isFormActive
                    ? css`
                        border-bottom: 2px solid #4f6ea3;
                      `
                    : ""
                )}
                onClick={() => {
                  activate("form");
                }}
                dialogClassName={cx(css`
                  height: 80vh !important;
                  min-width: 750px !important;
                `)}
                dialog={({ open, onClose }) => {
                  return (
                    <EditorForm
                      config={config}
                      ed={ed}
                      onClose={onClose}
                      page={page}
                      open={open}
                      comp={{ Btn, BtnBox, Coditor }}
                    />
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M2.5 3a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-10zM1 9.5a1.5 1.5 0 001 1.415v.585A1.5 1.5 0 003.5 13h8a1.5 1.5 0 001.5-1.5v-.585A1.5 1.5 0 0014 9.5v-6A1.5 1.5 0 0012.5 2h-10A1.5 1.5 0 001 3.5v6zm11 2V11H3v.5a.5.5 0 00.5.5h8a.5.5 0 00.5-.5zM5.5 6a.5.5 0 000 1h4a.5.5 0 000-1h-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Btn>
            </BtnBox>
            <BtnBox
              className={cx(
                isListActive
                  ? css`
                      border-bottom: 2px solid #4f6ea3;
                      margin-left: 5px;
                    `
                  : css`
                      margin-left: -1px;
                      border-left: 1px solid transparent;
                      border-radius: 0px !important;
                      border-top-right-radius: 2px !important;
                      border-bottom-right-radius: 2px !important;
                    `,

                css`
                  &:hover .sep {
                    opacity: 0 !important;
                  }
                `
              )}
            >
              <Btn
                tooltip="Add/Edit List"
                className={cx()}
                onClick={() => {
                  activate("list");
                }}
                dialogMode="modal"
                dialogClassName={cx(css`
                  height: 80vh !important;
                  min-width: 750px !important;
                `)}
                dialog={({ open, onClose }) => {
                  return (
                    <EditorList
                      config={config}
                      ed={ed}
                      onClose={onClose}
                      page={page}
                      open={open}
                      comp={{ Btn, BtnBox, Coditor }}
                    />
                  );
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.49998 4.09998C2.27906 4.09998 2.09998 4.27906 2.09998 4.49998C2.09998 4.72089 2.27906 4.89998 2.49998 4.89998H12.5C12.7209 4.89998 12.9 4.72089 12.9 4.49998C12.9 4.27906 12.7209 4.09998 12.5 4.09998H2.49998ZM2.49998 6.09998C2.27906 6.09998 2.09998 6.27906 2.09998 6.49998C2.09998 6.72089 2.27906 6.89998 2.49998 6.89998H12.5C12.7209 6.89998 12.9 6.72089 12.9 6.49998C12.9 6.27906 12.7209 6.09998 12.5 6.09998H2.49998ZM2.09998 8.49998C2.09998 8.27906 2.27906 8.09998 2.49998 8.09998H12.5C12.7209 8.09998 12.9 8.27906 12.9 8.49998C12.9 8.72089 12.7209 8.89998 12.5 8.89998H2.49998C2.27906 8.89998 2.09998 8.72089 2.09998 8.49998ZM2.49998 10.1C2.27906 10.1 2.09998 10.2791 2.09998 10.5C2.09998 10.7209 2.27906 10.9 2.49998 10.9H12.5C12.7209 10.9 12.9 10.7209 12.9 10.5C12.9 10.2791 12.7209 10.1 12.5 10.1H2.49998Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Btn>
              {isListActive && (
                <>
                  <div className="border-r self-center min-h-[18px] sep"></div>
                  <Btn
                    tooltip={
                      <>
                        <div className="text-[12px]"> List Render:</div>
                        <b>
                          {listRenderMode === "live"
                            ? "Actual Content"
                            : "Editor Preview"}
                        </b>
                      </>
                    }
                    className={cx(
                      "self-center px-2 flex items-center justify-center"
                    )}
                    dialogPopoverPos={"below"}
                    dialog={({ setOpen }) => {
                      return (
                        <div className="">
                          {Object.keys(listMode).map((key) => {
                            return (
                              <div
                                className={cx(
                                  "flex space-x-1 items-center text-xs border-b p-1 cursor-pointer",
                                  listRenderMode === key && `bg-green-100`
                                )}
                                key={key}
                                onClick={() => {
                                  if (ed.undoRedo && local.list) {
                                    const newlist = produce(
                                      ed.undoRedo.current,
                                      (draft) => {
                                        if (local.list) {
                                          const found = findByID(
                                            local.list.id,
                                            draft
                                          );
                                          if (found && found.update) {
                                            const c = found.content as IContent;
                                            const r = c.pluginData
                                              ?.royal as PluginData;

                                            if (r.list) {
                                              r.list.mode = key as any;
                                            }
                                          }
                                        }
                                      }
                                    );
                                    ed.undoRedo.updateRoot(newlist);
                                    setOpen(false);
                                  }
                                }}
                              >
                                {(icon as any)[key]}
                                <span>{listMode[key]}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  >
                    <div
                      className={cx(
                        css`
                          width: 12px;
                          height: 12px;
                        `,
                        "flex items-center"
                      )}
                    >
                      {listRenderMode === "loading" && icon.loading}
                      {listRenderMode === "live" && icon.live}
                      {listRenderMode === "edit" && icon.edit}
                    </div>
                  </Btn>

                  {listRenderMode === "live" && (
                    <>
                      <div className="border-r self-center min-h-[18px] sep"></div>
                      <Btn tooltip={"Reload List"}>
                        <div
                          className={cx(
                            css`
                              width: 12px;
                              height: 12px;
                            `,
                            "flex items-center"
                          )}
                        >
                          {icon.reload}
                        </div>
                      </Btn>
                    </>
                  )}
                </>
              )}
            </BtnBox>
          </>
        );
      }, [isFormActive, isListActive, local.shouldUpdate, listRenderMode]);

      if (!ed.active) return null;

      return content;
    },
  };
};

const icon = {
  loading: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5.877a6.623 6.623 0 100 13.246A6.623 6.623 0 007.5.877zM1.827 7.5a5.673 5.673 0 1111.346 0 5.673 5.673 0 01-11.346 0zM8 4.5a.5.5 0 00-1 0v3a.5.5 0 00.146.354l2 2a.5.5 0 00.708-.708L8 7.293V4.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  live: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5 11c-2.697 0-4.97-1.378-6.404-3.5C2.53 5.378 4.803 4 7.5 4s4.97 1.378 6.404 3.5C12.47 9.622 10.197 11 7.5 11zm0-8C4.308 3 1.656 4.706.076 7.235a.5.5 0 000 .53C1.656 10.294 4.308 12 7.5 12s5.844-1.706 7.424-4.235a.5.5 0 000-.53C13.344 4.706 10.692 3 7.5 3zm0 6.5a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  edit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.765 6.076a.5.5 0 01.159.689 9.519 9.519 0 01-1.554 1.898l1.201 1.201a.5.5 0 01-.707.707l-1.263-1.263a8.472 8.472 0 01-2.667 1.343l.449 1.677a.5.5 0 01-.966.258l-.458-1.709a8.666 8.666 0 01-2.918 0l-.458 1.71a.5.5 0 11-.966-.26l.45-1.676a8.473 8.473 0 01-2.668-1.343l-1.263 1.263a.5.5 0 01-.707-.707l1.2-1.201A9.521 9.521 0 01.077 6.765a.5.5 0 11.848-.53 8.425 8.425 0 001.77 2.034A7.462 7.462 0 007.5 9.999c2.808 0 5.156-1.493 6.576-3.764a.5.5 0 01.689-.159z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  reload: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.85 7.5c0-2.835 2.21-5.65 5.65-5.65 2.778 0 4.152 2.056 4.737 3.15H10.5a.5.5 0 000 1h3a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0v1.813C12.296 3.071 10.666.85 7.5.85 3.437.85.85 4.185.85 7.5c0 3.315 2.587 6.65 6.65 6.65 1.944 0 3.562-.77 4.714-1.942a6.77 6.77 0 001.428-2.167.5.5 0 10-.925-.38 5.77 5.77 0 01-1.216 1.846c-.971.99-2.336 1.643-4.001 1.643-3.44 0-5.65-2.815-5.65-5.65z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
};

const listMode: any = {
  live: "Actual Data",
  edit: "Editor Preview",
  loading: "Loading",
};
