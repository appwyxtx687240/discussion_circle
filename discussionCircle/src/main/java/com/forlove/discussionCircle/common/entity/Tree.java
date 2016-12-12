package com.forlove.discussionCircle.common.entity;

import java.util.List;

public class Tree {
	private String code;
	private String name;
	private String fathercode;
	private String statuss;

	public String getStatuss() {
		return statuss;
	}

	public void setStatuss(String statuss) {
		this.statuss = statuss;
	}

	private List<Tree> children;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFathercode() {
		return fathercode;
	}

	public void setFathercode(String fathercode) {
		this.fathercode = fathercode;
	}

	public List<Tree> getChildren() {
		return children;
	}

	public void setChildren(List<Tree> children) {
		this.children = children;
	}

}
