type BookSectionRow = {
  section_id: number; // PK یکتا در کل دیتابیس
  book_id: number;
  parent_id: number | null;
  title: string;
  page: number;
  level: number; // عمق: 1 = فصل/بخش اصلی، 2 = گفتار/زیربخش
  sort_order: number;
  slug: string;
};

function flattenTOC(): BookSectionRow[] {
  const result: BookSectionRow[] = [];
  let globalId = 0; // شمارنده یکتا برای PK

  function processSection(
    section: FehrestSection,
    bookId: number,
    parentId: number | null,
    level: number,
    sortOrder: number,
  ): number {
    globalId++;
    const currentId = globalId;

    // ساخت اسلاگ از عنوان
    const slug = section.title
      .replace(/[^a-z0-9آ-ی]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();

    result.push({
      section_id: currentId,
      book_id: bookId,
      parent_id: parentId,
      title: section.title,
      page: section.page,
      level: level,
      sort_order: sortOrder,
      slug: slug,
    });

    // پردازش زیربخش‌ها
    if (section.sections) {
      section.sections.forEach((child, index) => {
        processSection(child, bookId, currentId, level + 1, index + 1);
      });
    }

    return currentId;
  }

  // پردازش تمام کتاب‌ها
  BOOKS_TOC.forEach((book) => {
    book.sections.forEach((section, index) => {
      processSection(section, book.bookId, null, 1, index + 1);
    });
  });

  return result;
}

// خروجی:
const book_sections = flattenTOC();
console.log(book_sections);
