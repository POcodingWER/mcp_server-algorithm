import BinarySearchTree from "../BinarySearchTree";

describe("BinarySearchTree", () => {
  it("이진 검색 트리를 생성해야 함", () => {
    const bst = new BinarySearchTree();

    expect(bst).toBeDefined();
    expect(bst.root).toBeDefined();
    expect(bst.root.value).toBeNull();
    expect(bst.root.left).toBeNull();
    expect(bst.root.right).toBeNull();
  });

  it("값을 삽입해야 함", () => {
    const bst = new BinarySearchTree();

    const insertedNode1 = bst.insert(10);
    const insertedNode2 = bst.insert(20);
    bst.insert(5);

    expect(bst.toString()).toBe("5,10,20");
    expect(insertedNode1.value).toBe(10);
    expect(insertedNode2.value).toBe(20);
  });

  it("값이 존재하는지 확인해야 함", () => {
    const bst = new BinarySearchTree();

    bst.insert(10);
    bst.insert(20);
    bst.insert(5);

    expect(bst.contains(20)).toBeTruthy();
    expect(bst.contains(40)).toBeFalsy();
  });

  it("노드를 제거해야 함", () => {
    const bst = new BinarySearchTree();

    bst.insert(10);
    bst.insert(20);
    bst.insert(5);

    expect(bst.toString()).toBe("5,10,20");

    const removed1 = bst.remove(5);
    expect(bst.toString()).toBe("10,20");
    expect(removed1).toBeTruthy();

    const removed2 = bst.remove(20);
    expect(bst.toString()).toBe("10");
    expect(removed2).toBeTruthy();
  });

  it("객체 값을 삽입해야 함", () => {
    const nodeValueCompareFunction = (a: any, b: any) => {
      const normalizedA = a || { value: null };
      const normalizedB = b || { value: null };

      if (normalizedA.value === normalizedB.value) {
        return 0;
      }

      return normalizedA.value < normalizedB.value ? -1 : 1;
    };

    const obj1 = { key: "obj1", value: 1, toString: () => "obj1" };
    const obj2 = { key: "obj2", value: 2, toString: () => "obj2" };
    const obj3 = { key: "obj3", value: 3, toString: () => "obj3" };

    const bst = new BinarySearchTree(nodeValueCompareFunction);

    bst.insert(obj2);
    bst.insert(obj3);
    bst.insert(obj1);

    expect(bst.toString()).toBe("obj1,obj2,obj3");
  });

  it("정렬된 배열로 순회되어야 함", () => {
    const bst = new BinarySearchTree();

    bst.insert(10);
    bst.insert(-10);
    bst.insert(20);
    bst.insert(-20);
    bst.insert(25);
    bst.insert(6);

    expect(bst.toString()).toBe("-20,-10,6,10,20,25");
    expect(bst.root.height).toBe(2);

    bst.insert(4);

    expect(bst.toString()).toBe("-20,-10,4,6,10,20,25");
    expect(bst.root.height).toBe(3);
  });
});
