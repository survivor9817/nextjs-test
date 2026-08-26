type FlatSection = {
  section_id: number;
  book_id: number;
  parent_id: number | null;
  title: string;
  page: number;
  level: number;
  sort_order: number;
  slug: string;
};

type NestedSection = {
  id: number;
  page: number;
  title: string;
  sections?: NestedSection[];
};

export const buildNestedSections = (
  flatSections: FlatSection[],
  bookId?: number,
): NestedSection[] => {
  // اگه bookId داده شد، فقط همون کتاب رو فیلتر کن
  const sections = bookId ? flatSections.filter((s) => s.book_id === bookId) : flatSections;

  // مرتب‌سازی بر اساس sort_order
  const sorted = [...sections].sort((a, b) => a.sort_order - b.sort_order);

  // مپ برای دسترسی سریع
  const map = new Map<number, NestedSection>();

  // ریشه‌ها (parent_id === null)
  const roots: NestedSection[] = [];

  // پاس اول: همه رو تبدیل به NestedSection کن
  for (const s of sorted) {
    map.set(s.section_id, {
      id: s.section_id,
      page: s.page,
      title: s.title,
      sections: [],
    });
  }

  // پاس دوم: بچه‌ها رو بذار زیر والدشون
  for (const s of sorted) {
    const node = map.get(s.section_id)!;

    if (s.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(s.parent_id);
      if (parent) {
        parent.sections!.push(node);
      }
    }
  }

  // پاکسازی: اگه sections خالی بود، حذفش کن (اختیاری - برای تمیزی خروجی)
  function cleanSections(nodes: NestedSection[]) {
    for (const node of nodes) {
      if (node.sections && node.sections.length === 0) {
        delete node.sections;
      } else if (node.sections) {
        cleanSections(node.sections);
      }
    }
  }
  cleanSections(roots);

  return roots;
};
