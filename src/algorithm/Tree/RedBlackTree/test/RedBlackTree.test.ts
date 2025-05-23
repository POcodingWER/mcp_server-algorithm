import RedBlackTree from "../RedBlackTree";

describe("RedBlackTree", () => {
  it("첫 번째 삽입된 노드는 항상 검은색으로 설정되어야 한다", () => {
    const tree = new RedBlackTree();

    const firstInsertedNode = tree.insert(10);

    expect(tree.isNodeColored(firstInsertedNode)).toBeTruthy();
    expect(tree.isNodeBlack(firstInsertedNode)).toBeTruthy();
    expect(tree.isNodeRed(firstInsertedNode)).toBeFalsy();

    expect(tree.toString()).toBe("10");
    expect(tree.root!.height).toBe(0);
  });

  it("새로운 리프 노드는 항상 빨간색으로 설정되어야 한다", () => {
    const tree = new RedBlackTree();

    const firstInsertedNode = tree.insert(10);
    const secondInsertedNode = tree.insert(15);
    const thirdInsertedNode = tree.insert(5);

    expect(tree.isNodeBlack(firstInsertedNode)).toBeTruthy();
    expect(tree.isNodeRed(secondInsertedNode)).toBeTruthy();
    expect(tree.isNodeRed(thirdInsertedNode)).toBeTruthy();

    expect(tree.toString()).toBe("5,10,15");
    expect(tree.root!.height).toBe(1);
  });

  it("트리는 스스로 균형을 맞춰야 한다", () => {
    const tree = new RedBlackTree();

    tree.insert(5);
    tree.insert(10);
    tree.insert(15);
    tree.insert(20);
    tree.insert(25);
    tree.insert(30);

    expect(tree.toString()).toBe("5,10,15,20,25,30");
    expect(tree.root!.height).toBe(3);
  });

  it("부모가 검은색일 때 트리는 스스로 균형을 맞춰야 한다", () => {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);

    expect(tree.isNodeBlack(node1)).toBeTruthy();

    const node2 = tree.insert(-10);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeRed(node2)).toBeTruthy();

    const node3 = tree.insert(20);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeRed(node2)).toBeTruthy();
    expect(tree.isNodeRed(node3)).toBeTruthy();

    const node4 = tree.insert(-20);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();

    const node5 = tree.insert(25);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();

    const node6 = tree.insert(6);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();

    expect(tree.toString()).toBe("-20,-10,6,10,20,25");
    expect(tree.root!.height).toBe(2);

    const node7 = tree.insert(4);

    expect(tree.root!.left!.value).toEqual(node2.value);

    expect(tree.toString()).toBe("-20,-10,4,6,10,20,25");
    expect(tree.root!.height).toBe(3);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeRed(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeBlack(node4)).toBeTruthy();
    expect(tree.isNodeBlack(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();
    expect(tree.isNodeBlack(node6)).toBeTruthy();
    expect(tree.isNodeRed(node7)).toBeTruthy();
  });

  it("삼촌이 빨간색일 때 트리는 스스로 균형을 맞춰야 한다", () => {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(-20);
    const node5 = tree.insert(6);
    const node6 = tree.insert(15);
    const node7 = tree.insert(25);
    const node8 = tree.insert(2);
    const node9 = tree.insert(8);

    expect(tree.toString()).toBe("-20,-10,2,6,8,10,15,20,25");
    expect(tree.root!.height).toBe(3);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeRed(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeBlack(node4)).toBeTruthy();
    expect(tree.isNodeBlack(node5)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();
    expect(tree.isNodeRed(node7)).toBeTruthy();
    expect(tree.isNodeRed(node8)).toBeTruthy();
    expect(tree.isNodeRed(node9)).toBeTruthy();

    const node10 = tree.insert(4);

    expect(tree.toString()).toBe("-20,-10,2,4,6,8,10,15,20,25");
    expect(tree.root!.height).toBe(3);

    expect(tree.root!.value).toBe(node5.value);

    expect(tree.isNodeBlack(node5)).toBeTruthy();
    expect(tree.isNodeRed(node1)).toBeTruthy();
    expect(tree.isNodeRed(node2)).toBeTruthy();
    expect(tree.isNodeRed(node10)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();
    expect(tree.isNodeRed(node7)).toBeTruthy();
    expect(tree.isNodeBlack(node4)).toBeTruthy();
    expect(tree.isNodeBlack(node8)).toBeTruthy();
    expect(tree.isNodeBlack(node9)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
  });

  it("좌-좌 회전을 수행해야 한다", () => {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(7);
    const node5 = tree.insert(15);

    expect(tree.toString()).toBe("-10,7,10,15,20");
    expect(tree.root!.height).toBe(2);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();

    const node6 = tree.insert(13);

    expect(tree.toString()).toBe("-10,7,10,13,15,20");
    expect(tree.root!.height).toBe(2);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node5)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();
    expect(tree.isNodeRed(node3)).toBeTruthy();
  });

  it("좌-우 회전을 수행해야 한다", () => {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(7);
    const node5 = tree.insert(15);

    expect(tree.toString()).toBe("-10,7,10,15,20");
    expect(tree.root!.height).toBe(2);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();

    const node6 = tree.insert(17);

    expect(tree.toString()).toBe("-10,7,10,15,17,20");
    expect(tree.root!.height).toBe(2);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node6)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();
    expect(tree.isNodeRed(node3)).toBeTruthy();
  });

  it("색상 변경, 좌-좌 회전 및 좌-우 회전을 수행해야 한다", () => {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(-20);
    const node5 = tree.insert(6);
    const node6 = tree.insert(15);
    const node7 = tree.insert(30);
    const node8 = tree.insert(1);
    const node9 = tree.insert(9);

    expect(tree.toString()).toBe("-20,-10,1,6,9,10,15,20,30");
    expect(tree.root!.height).toBe(3);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeRed(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeBlack(node4)).toBeTruthy();
    expect(tree.isNodeBlack(node5)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();
    expect(tree.isNodeRed(node7)).toBeTruthy();
    expect(tree.isNodeRed(node8)).toBeTruthy();
    expect(tree.isNodeRed(node9)).toBeTruthy();

    tree.insert(4);

    expect(tree.toString()).toBe("-20,-10,1,4,6,9,10,15,20,30");
    expect(tree.root!.height).toBe(3);
  });

  it("우-좌 회전을 수행해야 한다", () => {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(-20);
    const node5 = tree.insert(6);
    const node6 = tree.insert(30);

    expect(tree.toString()).toBe("-20,-10,6,10,20,30");
    expect(tree.root!.height).toBe(2);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node3)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();

    const node7 = tree.insert(25);

    const rightNode = tree.root!.right!;
    const rightLeftNode = rightNode.left!;
    const rightRightNode = rightNode.right!;

    expect(rightNode.value).toBe(node7.value);
    expect(rightLeftNode.value).toBe(node3.value);
    expect(rightRightNode.value).toBe(node6.value);

    expect(tree.toString()).toBe("-20,-10,6,10,20,25,30");
    expect(tree.root!.height).toBe(2);

    expect(tree.isNodeBlack(node1)).toBeTruthy();
    expect(tree.isNodeBlack(node2)).toBeTruthy();
    expect(tree.isNodeBlack(node7)).toBeTruthy();
    expect(tree.isNodeRed(node4)).toBeTruthy();
    expect(tree.isNodeRed(node5)).toBeTruthy();
    expect(tree.isNodeRed(node3)).toBeTruthy();
    expect(tree.isNodeRed(node6)).toBeTruthy();
  });

  it("좌측 조부모와 함께 좌-좌 회전을 수행해야 한다", () => {
    const tree = new RedBlackTree();

    tree.insert(20);
    tree.insert(15);
    tree.insert(25);
    tree.insert(10);
    tree.insert(5);

    expect(tree.toString()).toBe("5,10,15,20,25");
    expect(tree.root!.height).toBe(2);
  });

  it("좌측 조부모와 함께 우-우 회전을 수행해야 한다", () => {
    const tree = new RedBlackTree();

    tree.insert(20);
    tree.insert(15);
    tree.insert(25);
    tree.insert(17);
    tree.insert(19);

    expect(tree.toString()).toBe("15,17,19,20,25");
    expect(tree.root!.height).toBe(2);
  });

  it("노드 제거를 시도할 때 오류를 발생시켜야 한다", () => {
    const removeNodeFromRedBlackTree = () => {
      const tree = new RedBlackTree();

      tree.remove(1);
    };

    expect(removeNodeFromRedBlackTree).toThrowError();
  });
});
