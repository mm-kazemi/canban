import { type ReactNode, useState } from "react";

import { listsData } from "../../data/list-data.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import type { ListType } from "../../types/list.ts";
import Button from "../Button/Button.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(listsData);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleListItemClick = (listId: string, itemId: string): void => {
    setActiveListId(listId);
    setActiveItemId(itemId);
  };

  const handleDeleteListItemClick = (): void => {
    if (!activeListId || !activeItemId) {
      return;
    }
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.filter((i) => i.id !== activeItemId) }
          : list,
      ),
    );
    setActiveItemId(null);
    setActiveListId(null);
  };

  // const handleMoveButtonClick = (destinationListId: string): void => {
  //   // ۱. گاردهای محافظ (Validation)
  //   // اگر مبدا و مقصد یکی هستند یا چیزی انتخاب نشده، هیچ کاری نکن.
  //   if (
  //     !activeListId ||
  //     !activeItemId ||
  //     activeListId === destinationListId
  //   ) {
  //     return;
  //   }
  //
  //   // ۲. پیدا کردن آیتمی که قرار است جابجا شود
  //   // نکته: باید اول خودِ آبجکت آیتم را پیدا کنیم تا بتوانیم در مقصد اضافه‌اش کنیم.
  //   // فرض بر این است که متغیر lists (استیت اصلی) در دسترس است.
  //   const sourceList = lists.find((l) => l.id === activeListId);
  //   const itemToMove = sourceList?.items.find((i) => i.id === activeItemId);
  //
  //   // اگر آیتم پیدا نشد، ادامه نده (جلوگیری از کرش)
  //   if (!itemToMove) return;
  //
  //   // ۳. آپدیت اتمیک استیت
  //   setLists((prevLists) => {
  //     return prevLists.map((list) => {
  //
  //       // الف) اگر لیست فعلی، لیست مبدا (Source) است: آیتم را حذف کن
  //       if (list.id === activeListId) {
  //         return {
  //           ...list,
  //           items: list.items.filter((item) => item.id !== activeItemId),
  //         };
  //       }
  //
  //       // ب) اگر لیست فعلی، لیست مقصد (Destination) است: آیتم را اضافه کن
  //       if (list.id === destinationListId) {
  //         return {
  //           ...list,
  //           items: [...list.items, itemToMove], // آیتم پیدا شده را به ته لیست اضافه کن
  //         };
  //       }
  //
  //       // ج) سایر لیست‌ها: بدون تغییر برگردان
  //       return list;
  //     });
  //   });
  //
  //   // ۴. ریست کردن حالت انتخاب
  //   setActiveListId(null);
  //   setActiveItemId(null);
  // };

  const handleMoveButtonClick = (destinationListId: string): void => {
    if(!activeListId || !activeItemId || destinationListId === activeListId) {
      return;
    }
    const sourceList = lists.filter((i) => i.id === activeListId);
    const sourceItem= sourceList.filter((i) => i.id === activeItemId);

    if (!sourceItem) {
      return;
    }

    setLists(prev => prev.map);
  }

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          {activeListId !== null && (
            <div className={styles.spacer}>
              {lists
                .filter((list) => list.id !== activeListId)
                .map((list) => (
                  <Button key={list.id} onClick={handleMoveButtonClick}>{list.title}</Button>
                ))}
              <Button onClick={handleDeleteListItemClick}>Remove</Button>
            </div>
          )}
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <li key={list.id}>
            <List list={list} onClick={handleListItemClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
