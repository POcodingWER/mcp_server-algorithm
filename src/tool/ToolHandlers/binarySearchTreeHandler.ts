import { ToolSchemas, ToolName } from "../ToolSchemas";
import { createResponse, getListById, validateValueParam } from "./handlers";
import BinarySearchTree from "../../algorithm/Tree/BinarySearchTree/BinarySearchTree";

const binarySearchTreeStore: Map<string, BinarySearchTree<string>> = new Map();

export const binarySearchTreeHandler = async (
  args: Record<string, unknown> | undefined
) => {
  const validatedArgs = ToolSchemas[ToolName.BINARY_SEARCH_TREE].parse(args);
  const { operation, value, listId } = validatedArgs;

  switch (operation) {
    case "create": {
      const newListId = `binary_search_tree_${Math.floor(
        Math.random() * 1000
      )}`;
      const newTree = new BinarySearchTree<string>();
      binarySearchTreeStore.set(newListId, newTree);

      return createResponse(
        `새 이진 검색 트리가 생성되었습니다. ID: ${newListId}`,
        {
          listId: newListId,
        }
      );
    }

    case "insert": {
      validateValueParam(value, "insert");
      const tree = getListById(
        binarySearchTreeStore,
        listId,
        ToolName.BINARY_SEARCH_TREE
      );
      tree.insert(value as string);

      return createResponse(`이진 검색 트리에 '${value}' 값이 삽입되었습니다.`);
    }

    case "contains": {
      validateValueParam(value, "contains");
      const tree = getListById(
        binarySearchTreeStore,
        listId,
        ToolName.BINARY_SEARCH_TREE
      );
      const exists = tree.contains(value as string);

      return createResponse(
        exists
          ? `이진 검색 트리에 '${value}' 값이 존재합니다.`
          : `이진 검색 트리에 '${value}' 값이 존재하지 않습니다.`
      );
    }

    case "remove": {
      validateValueParam(value, "remove");
      const tree = getListById(
        binarySearchTreeStore,
        listId,
        ToolName.BINARY_SEARCH_TREE
      );
      const removed = tree.remove(value as string);

      return createResponse(
        removed
          ? `이진 검색 트리에서 '${value}' 값이 제거되었습니다.`
          : `이진 검색 트리에서 '${value}' 값을 찾을 수 없습니다.`
      );
    }

    case "toString": {
      const tree = getListById(
        binarySearchTreeStore,
        listId,
        ToolName.BINARY_SEARCH_TREE
      );
      const treeString = tree.toString();

      return createResponse(treeString);
    }

    case "getBalance": {
      const tree = getListById(
        binarySearchTreeStore,
        listId,
        ToolName.BINARY_SEARCH_TREE
      );
      return createResponse(
        `이진 검색 트리의 균형 상태: ${tree.root.balanceFactor}`
      );
    }

    default:
      throw new Error(
        `지원하지 않는 작업: ${operation}. 가능한 작업: create, insert, contains, remove, toString, getBalance`
      );
  }
};
